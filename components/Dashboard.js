import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projectCount, setProjectCount] = useState(0); // State to hold the number of projects
  const [courseCount, setCourseCount] = useState(0); // State to hold the number of courses
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch the number of projects from the backend API
    fetch('http://localhost:8080/count-projects') // Adjust the URL as needed
      .then((response) => response.json())
      .then((data) => {
        setProjectCount(data.count); // Assuming the response has a 'count' field
      })
      .catch((error) => {
        console.error('Error fetching project count:', error);
      });

    // Fetch the number of courses from the backend API
    fetch('http://localhost:8080/count-courses') // Adjust the URL as needed
      .then((response) => response.json())
      .then((data) => {
        setCourseCount(data.count); // Assuming the response has a 'count' field
        setLoading(false); // Update loading status once both fetches are complete
      })
      .catch((error) => {
        console.error('Error fetching course count:', error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-heading">Dashboard</h2>
      <div className="card-container">
        <div className="card projects-card">
          <div className="card-content">
            <h3>Projects</h3>
            <p>Explore our available projects and collaborate with others.</p>
            <p className="card-stat">{projectCount}+ Projects Available</p>
            <button className="card-button" onClick={() => navigate('/projects')}>View Projects</button>
          </div>
        </div>
        <div className="card courses-card">
          <div className="card-content">
            <h3>Courses</h3>
            <p>Join our available courses to enhance your skills and expertise.</p>
            <p className="card-stat">{courseCount}+ Courses Available</p>
            <button className="card-button" onClick={() => navigate('/courses')}>View Courses</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
