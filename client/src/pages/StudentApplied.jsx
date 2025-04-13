import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth'; // Import useAuth to get user details
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ApplicationStatus.css';
import { Navbar } from '../components/Navbar';

const StudentApplied = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Get user details from context

  useEffect(() => {
    const fetchUniversities = async () => {
      if (!user) {
        console.log('User is not yet available. Waiting...');
        return; // Return early if user is not defined yet
      }
  
      if (!user.email) {
        console.log('Email is missing in user data:', user);
        setError('User information is incomplete.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`https://unitantra-backend.onrender.com/api/applied/${user.email}`);
        console.log('Response:', response.data);
  
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUniversities(response.data); // Set the universities directly from the response
        } else {
          setError('No universities found for this email.');
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
        setError('Error fetching universities. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUniversities(); // Call the fetch function
  }, [user]); // Add user to dependencies to fetch on user change
  
  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>{error}</p>;
  }

  // Handle no universities case
  if (universities.length === 0) {
    return <p>No universities found.</p>;
  }

  // Utility function to truncate link text
  const truncateLink = (link) => {
    const words = link.split(' ');
    return words.length <= 4 ? link : words.slice(0, 4).join(' ') + '...';
  };

  return (
    <>
      <Navbar />
      <div className="application-status">
        <h1 style={{ color: '#3176B7' }}>Applied Universities</h1>
        <ul className="university-list">
          {universities.map((university) => (
            <li key={university._id} className="university-item">
              <p><strong>University:</strong> {university.university}</p>
              <p><strong>Course:</strong> {university.course}</p>
              <p><strong>Link:</strong> 
                <a 
                  href={university.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="short-link"
                >
                  {truncateLink(university.link)}
                </a>
              </p>
              <p><strong>Status:</strong> {university.mystatus || 'N/A'}</p>
              {/* Removed Apply button as it's not needed */}
            </li>
          ))}
        </ul>
        <ToastContainer />
      </div>
    </>
  );
};

export default StudentApplied;
