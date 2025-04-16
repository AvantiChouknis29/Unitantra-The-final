import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './search.css';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth'; // Adjust the import path according to your project structure
import { Sidebar } from './Sidebar'; // Adjust the import path according to your project structure
import { Navbar } from '../components/Navbar';
export const Search = () => {
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { getToken } = useAuth(); // Use getToken from the auth context

  useEffect(() => {
    // Fetch universities for the initial page when component mounts
    fetchUniversities(1);
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetchUniversities(1); // Reset to first page on new search
  };

  const fetchUniversities = async (page) => {
    try {
      const response = await axios.get(`https://unitantra-backend.onrender.com/api/auth/getAllUniversities`, {
        params: {
          university,
          course,
          level,
          country,
          page,
          limit: 15// Number of items per page
        }
      });
      setUniversities(response.data.universities);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setUniversities([]);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchUniversities(page);
    }
  };

  const handleShortlist = async (university) => {
    try {
      const token = getToken(); // Get the authentication token
      if (!token) {
        toast.error('You must be logged in to shortlist a university.');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      // Make a POST request to add university to cart
      await axios.post('https://unitantra-backend.onrender.com/api/add-to-cart', {
        university: university.University,
        course: university.Course,
        link: university.Link
      }, { headers });

      // Show a success message
      toast.success("University Shortlisted!");
    } catch (error) {
      console.error('Error shortlisting university:', error);
      toast.error('Error shortlisting university. Please try again.');
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const totalNumbers = 5;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);
      let pages = [];

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage > 3) {
        pages = [1, '...', ...pages];
      } else {
        pages = [1, ...pages];
      }

      if (currentPage < totalPages - 2) {
        pages = [...pages, '...', totalPages];
      } else {
        pages = [...pages, totalPages];
      }

      pageNumbers.push(...pages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return (
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={index} className="ellipsis">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`page-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="page-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  const truncateLink = (link) => {
    const maxLength = 5; // Maximum characters to display before truncating
    return link.length > maxLength ? `${link.substring(0, maxLength)}...` : link;
  };
  return (<><Navbar></Navbar>
    <div className="main-content-container">
     
      <div className="form-container">
        <div className="form-content">
          <h1 className="header-title" style={{ textAlign: 'center', color: '#2e78b9' }}>Find a perfect course for you!</h1>
          <br />
          <form onSubmit={handleSubmit} className="search-form">
            <input type="text" placeholder="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
            <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
            <input type="text" placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} />
            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <button type="submit" className="btn-search" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
          </form>
          {error && <p className="error">{error}</p>}
          <div className="results">
            <div className="cards-container">
              {universities.map((university, index) => (
                <div className="card" key={index}>
                  <p style={{ textAlign: 'center' }}><strong>🎓University:</strong> {university.University}</p>
                  <p style={{ textAlign: 'center' }}><strong>Country:</strong> {university.Country}</p>
                  <br />
                  <p><strong>Course:</strong> {university.Course}</p>
                  <p><strong>Level:</strong> {university.Level}</p>
                  <p><strong>Fees:</strong> {university.Fee}</p>
                  <p><strong>Course Duration:</strong> {university.Duration}</p>
                  <p >🔗To learn more <a href={university.Link} target="_blank" rel="noopener noreferrer">{truncateLink(university.Link)}</a></p>
                  <br></br> <button className='shortlist-btn' onClick={() => handleShortlist(university)}>Shortlist</button>
                </div>
              ))}
            </div>
          </div>
          {renderPagination()}
        </div>
      </div>
    </div></>
  );
};
