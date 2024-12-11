import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch total number of users from backend
    const fetchUsersCount = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/count');
        if (!response.ok) {
          throw new Error('Failed to fetch user count');
        }
        const data = await response.json();
        setUsersCount(data.count); // Set total users count
      } catch (err) {
        setError(err.message); // Display error message
      }
    };

    fetchUsersCount();
  }, []); // Empty array ensures this runs only once after the component mounts

  return (
    <div className="admin-container">
      <h1 className="admin-header">Admin Panel</h1>

      {/* Show number of users */}
      <div className="admin-info">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p>Total Users: {usersCount}</p>
        )}
      </div>

      {/* Navigation Links for Admin */}
      <div className="admin-links">
        <Link to="/add-projects" className="admin-link">
          Add Project
        </Link>
        <Link to="/add-courses" className="admin-link">
          Add Course
        </Link>
        <Link to="/view-projects" className="admin-link">
          View Projects
        </Link>
      </div>
    </div>
  );
};

export default Admin;
