// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth'; // Update the path as per your folder structure
import './sidebar.css';

export const Sidebar = () => {
  const { user } = useAuth(); // Get the logged-in user info from context

  return (
    <div className="sidebar">
      <ul>
        <div className='logo'>
          <NavLink to="/" className="logo-link">Unitantra</NavLink>
        </div>
        <li><NavLink to="/flightTicket" className="service">Flight Ticket</NavLink></li>
        <li><NavLink to="/accommodation" className="service">Accommodation</NavLink></li>
        <li><NavLink to="/counselling" className="service">Counselling</NavLink></li>
        <li><NavLink to="/queries" className="service">Need Help?</NavLink></li>

        {/* Render Admin link only if user.isAdmin is true */}
        {user?.isAdmin && (
          <li><NavLink to="/admin/home" className="service">Admin</NavLink></li>
        )}
      </ul>
    </div>
  );
};
