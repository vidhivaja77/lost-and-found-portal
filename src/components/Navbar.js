import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const isLoggedIn = false;

function Navbar() {
  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <span>UniFind</span>
          </Link>
        </div>

        <div style={{ flexGrow: 1 }}></div>

        <div className="navbar-actions">
            <ul className="navbar-links-right">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add?type=lost">Report Lost</Link></li>
                <li><Link to="/add?type=found">Report Found</Link></li>
                <li><Link to="/browse">Listed Items</Link></li>
            </ul>

            <Link to="/my-profile" className="btn-profile-text">
                My Profile
            </Link>

            {!isLoggedIn && (
                <Link to="/login" className="btn btn-primary">
                    Login
                </Link>
            )}
            
            <button className="search-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;