import React, { useEffect, useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);  // State to hold the projects
  const [loading, setLoading] = useState(true);  // State to track loading status

  useEffect(() => {
    // Fetch projects from the backend API
    fetch('http://localhost:8080/view-projects')  // Adjust the URL as needed
      .then((response) => response.json())  // Parse the JSON response
      .then((data) => {
        setProjects(data);  // Set the projects data in the state
        setLoading(false);  // Update the loading status
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setLoading(false);  // Stop loading even if there's an error
      });
  }, []);  // Empty dependency array ensures this runs once on component mount

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while data is being fetched
  }

  return (
    <div className="projects-page">
      <h2 className="projects-heading">Available Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="card project-card">
            <div className="card-content">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p className="card-stat">{project.teamMembers} Team Members</p>
              <button className="card-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
