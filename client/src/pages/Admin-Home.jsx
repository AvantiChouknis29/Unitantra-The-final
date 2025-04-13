// AdminHome.jsx
import React, { useState, useEffect } from 'react';
import './AdminHome.css';
import { NavLink } from "react-router-dom";
import axios from 'axios';

const AdminHome = () => {
  // State to hold the statistics
  const [stats, setStats] = useState({
    studentCount: 0,
    partnerCount: 0,
    studentApplicationsCount: 0,
    partnerStudentApplicationsCount: 0
  });

  // State for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch stats from the backend
  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Error fetching statistics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats when the component is mounted
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>👩‍💻 Admin Dashboard</h1>
        <p>Welcome back, Super Admin!</p>
      </header>

      {/* Show loading spinner while data is loading */}
      {loading && <p>Loading statistics...</p>}

      {/* Show error message if API call fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Show stats once they are fetched */}
      {!loading && !error && (
        <section className="stats-grid">
          <div className="card">
            <h2>👥 Students</h2>
            <p>{stats.studentCount}</p>
          </div>
          <div className="card">
            <h2>🤝 Partners</h2>
            <p>{stats.partnerCount}</p>
          </div>
          <div className="card">
            <h2>🧑🏻‍🎓 Applied<br /> (Student)</h2>
            <p>{stats.studentApplicationsCount}</p>
          </div>
          <div className="card">
            <h2>🧑🏼‍🎓 Applied<br /> (Partner)</h2>
            <p>{stats.partnerStudentApplicationsCount}</p>
          </div>
        </section>
      )}

      <section className="action-buttons">
        <button>
          <NavLink to="/admin/user/requests">Auxiliary Requests</NavLink>
        </button>
        <button>
          <NavLink to="/admin/agency/verification">Partner Requests</NavLink>
        </button>
      </section>
    </div>
  );
};

export default AdminHome;
