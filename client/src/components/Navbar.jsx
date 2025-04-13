import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css"
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import {Badge} from 'antd'
export const Navbar = () => {
    const [cart]=useCart()
    const {isLoggedIn}=useAuth()
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                      
                    </div> 
                    <nav><br></br>
                        <ul>
                            
                        {isLoggedIn ?<li><NavLink to="/dashboard">Dashboard</NavLink></li>:""}
                       
                            <li><NavLink to="/search">Search & Apply</NavLink></li>
                            {isLoggedIn ?<li><NavLink to="/applied">Applied</NavLink></li>:""}
                       
                            {isLoggedIn && <li><NavLink to="/profile">Profile</NavLink></li>}
                          
                            {isLoggedIn ? <li><NavLink to="/logout">Logout</NavLink></li>:<li><NavLink to="/login">Login</NavLink></li> }
                          
                              </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
