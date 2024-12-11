import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ role, onLogout }) {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">ENVIRON</h1>
      <ul className="navbar-links">
        {/* Links for User Role */}
        {role === 'user' && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={onLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}
        
        {/* Links for Admin Role */}
        {role === 'admin' && (
          <>
            <li><Link to="/admin">Admin Panel</Link></li>
            <li><Link to="/add-projects">Add Projects</Link></li>
            <li><Link to="/add-courses">Add Courses</Link></li>
            <li>
              <button onClick={onLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        )}

        {/* Links for No Role */}
        {!role && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
