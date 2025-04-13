// ApplicationStatus.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth'; // Adjust the import path according to your project structure
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApplicationStatus.css'; // Ensure you import the CSS file

const ApplicationStatus = ({ setShortlistedCount }) => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken, user } = useAuth(); // Assuming useAuth provides user details

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const token = getToken(); // Get the authentication token
        if (!token) {
          setError('You must be logged in to view application status.');
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get('http://localhost:5000/api/get-cart-items', { headers });
        console.log('Response:', response.data); 
        setUniversities(response.data.universities);
        setShortlistedCount(response.data.universities.length); // Update shortlisted count
        setLoading(false);
      } catch (error) {
        console.error('Error fetching universities:', error);
        setError('Error fetching universities. Please try again.');
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [getToken, setShortlistedCount]); // Ensure setShortlistedCount is included in dependencies array

  const handleApplyClick = async (university) => {
    try {
      const token = getToken(); // Get the authentication token
      if (!token) {
        toast.error('You must be logged in to apply.');
        return;
      }

      if (!user || !user.email || !user.username || !user.phone) {
        toast.error('User information incomplete.');
        return;
      }

      const { email, username, phone } = user; // Destructure user details

      const headers = { Authorization: `Bearer ${token}` };
      const payload = {
        university: university.university,
        course: university.course,
        link: university.link,
       
        email: email,
        username: username,
        phone: phone,
      };

      const response = await axios.post('http://localhost:5000/api/apply', payload, { headers });
      console.log('Apply Response:', response.data); // Log the response from backend
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Ensure universities is an array before mapping
  if (!Array.isArray(universities) || universities.length === 0) {
    return <p>No universities found.</p>;
  }

  // Utility function to truncate link text to the first 4 words followed by '...'
  const truncateLink = (link) => {
    const words = link.split(' ');
    if (words.length <= 4) return link;
    return words.slice(0, 4).join(' ') + '...';
  };

  return (
    <div className="application-status">
      <h1 style={{ color: '#3176B7' }}>Shortlisted </h1>
      <ul className="university-list">
        {universities.map((university) => (
          <li key={university._id} className="university-item">
            <p><strong>University:</strong> {university.university}</p>
            <p><strong>Course:</strong> {university.course}</p>
            <p><strong>Link:</strong> <a href={university.link} target="_blank" rel="noopener noreferrer" className="short-link">{truncateLink(university.link)}</a></p>
            
            <button onClick={() => handleApplyClick(university)}>Apply</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default ApplicationStatus;
