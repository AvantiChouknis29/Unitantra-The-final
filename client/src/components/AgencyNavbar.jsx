import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import { useAgencyAuth } from '../store/agency_auth'; // Corrected import statement
import { useCart } from '../store/cart';
import {Badge} from 'antd'
export const AgencyNavbar = () => {
    const [cart]=useCart()
    const {isLoggedInAgency}=useAgencyAuth();
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                      
                    </div> 
                    <nav><br></br>
                        <ul>
                            
                       <li><NavLink to="/agencydashboard">Dashboard</NavLink></li>
                       
                       <li><NavLink to="/agencysearch">Search & Apply</NavLink></li>
                       
                            <li><NavLink to="/agencyapplications">Applications</NavLink></li>
                            <li><NavLink to="/agencyaddstudent">Add Student</NavLink>   </li>
                            <li><NavLink to="/agencystudents">All Students</NavLink>   </li>
                        
                             
                        <li><NavLink to="/agencyprofile">Profile</NavLink></li>
                        {isLoggedInAgency? 
                        <li><NavLink to="/agencylogout">Logout</NavLink></li>
                        :
                      <><li><NavLink to="/agencylogin">Login</NavLink></li>
                        <li><NavLink to="/agencyregistration">Register</NavLink></li></>  }
                         


                       
                    
                              </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
