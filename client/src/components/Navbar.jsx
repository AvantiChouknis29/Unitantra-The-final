import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { Badge } from 'antd';

export const Navbar = () => {
  const [cart] = useCart();
  const { isLoggedIn, user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 475);
  const [showMenu, setShowMenu] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 475);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header>
      <div className="navbar-container">
        <div className="logo-brand">
          <NavLink to="/">Unitantra</NavLink>
        </div>

        {/* Toggle button for small screens */}
        {isMobile && (
          <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? "Close" : "Menu"}
          </button>
        )}

        {/* Nav menu */}
        {(showMenu || !isMobile) && (
          <nav className="nav-menu">
            <ul>
              {isLoggedIn && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
              {isLoggedIn && <li><NavLink to="/search">Search & Apply</NavLink></li>}
              {isLoggedIn && <li><NavLink to="/applied">Applied</NavLink></li>}
              {isLoggedIn && <li><NavLink to="/profile">Profile</NavLink></li>}
              {user?.isAdmin && <li><NavLink to="/admin/home">Admin</NavLink></li>}
              {isLoggedIn
                ? <li><NavLink to="/logout">Logout</NavLink></li>
                : <li><NavLink to="/login">Login</NavLink></li>
              }
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};
