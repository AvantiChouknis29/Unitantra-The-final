import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import './sidebar.css'; // Import the CSS file for styling

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <div className='logo'>
          <NavLink to="/" className="logo-link">Unitantra</NavLink> 
        </div>
        <li><NavLink to="/flightTicket" className="service">Flight Ticket</NavLink></li> 
       
        <li><NavLink to="/accommodation" className="service">Accommodation</NavLink></li>
       {/*<li><NavLink to="/ielts" className="service">IELTS/PTE</NavLink></li>*/}
        <li><NavLink to="/counselling" className="service">Counselling</NavLink></li>
         <li><NavLink to="/queries" className="service">Need Help?</NavLink></li> 
        
         <li><NavLink to="/admin/home" className="service">Admin</NavLink></li> 
    
      
      </ul>
    </div>   
  );
};
