import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './search.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAgencyAuth } from '../store/agency_auth'; // Adjust the import path according to your project structure
import { AgencyNavbar } from '../components/AgencyNavbar';

export const AgencySearch = () => {
  const { agency } = useAgencyAuth(); // Fetch agency data from context

  if (!agency) {
    return <h1>No Page Available</h1>; // Or any other loading state
  }

  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState('');
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmation, setConfirmation] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

 
  const { getToken } = useAgencyAuth(); // Use getToken from the auth context

  useEffect(() => {
    fetchUniversities(1);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetchUniversities(1);
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
          limit: 15 
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

      const userUID = prompt('Please enter student UID:');
      if (!userUID) {
        toast.error('User UID is required.');
        return;
      }



    
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post('https://unitantra-backend.onrender.com/api/agency-students/add-student', {
        university: university.University,
        course: university.Course,
        link: university.Link,
        userUID: userUID,
        agencyId: agency._id,
      }, { headers });

      toast.success("University Application Requested!");
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
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span key={index} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`pagination-button ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  const truncateLink = (link) => {
    const maxLength = 30; 
    return link.length > maxLength ? `${link.substring(0, maxLength)}...` : link;
  };

  return (
    <>
      <AgencyNavbar />
      <div className="main-content-container">
        <div className="form-container">
          <div className="form-content">
            <h1 className="header-title">Find a perfect course for you!</h1>
            <br />
            <form onSubmit={handleSubmit} className="search-form">
              <input type="text" placeholder="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
              <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
              <input type="text" placeholder="Level" value={level} onChange={(e) => setLevel(e.target.value)} />
              <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
              <button type="submit">Search</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <br />
            {loading && <p>Loading...</p>}
            {!loading && universities.length === 0 && <p>No universities found.</p>}
            <ul className="university-list">
              {universities.map((university, index) => (
                <li key={index} className="university-item">
                  <div className="university-details">
                    <h3 className="university-name">{university.University}</h3>
                    <p className="university-course">{university.Course}</p>
                    <p className="university-level">Level: {university.Level}</p>
                    <p className="university-country">Country: {university.Country}</p>
                    <p>
                      <a href={university.Link} target="_blank" rel="noopener noreferrer" className="university-link">
                        {truncateLink(university.Link)}
                      </a>
                    </p>
                  </div>
                  <button className="shortlist-button" onClick={() => handleShortlist(university)}>
                    Apply using UID
                  </button>
                  {confirmation && (
                    <div className="confirmation-box">
                      <p>Are you sure you want to apply for this student?</p>
                      <button className="confirm-btn" onClick={() => handleConfirm(true)}>Confirm</button>
                      <button className="cancel-btn" onClick={() => handleConfirm(false)}>Cancel</button>
                    </div>)}
                  <br />
                  <br />
                  <button className="shortlist-buttons">
                    <Link to="/agencyaddstudent">New Student?</Link>
                  </button>
                  <br />
                  <br />
                </li>
              ))}
            </ul>
            {renderPagination()}
          </div>
        </div>
      </div>
    </>
  );
};
