import React, { useState } from 'react';
import './AddProjects.css';

const AddProjects = () => {
  const [project, setProject] = useState({
    name: '',
    maxTeams: '',
    teamMembers: '',
    description: '',
  });

  const [message, setMessage] = useState(''); // State to handle success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/addproject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        setMessage('Project added successfully!');
        setProject({ name: '', maxTeams: '', teamMembers: '', description: '' });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to add project. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please check your connection and try again.');
    }
  };

  return (
    <div className="add-projects">
      <h1>Add New Project</h1>
      {message && <p className={`message ${message.includes('Failed') || message.includes('error') ? 'error' : ''}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Project Name</label>
        <input
          type="text"
          name="name"
          value={project.name}
          placeholder="Enter project name"
          onChange={handleChange}
          required
        />

        <label>Max Teams</label>
        <input
          type="number"
          name="maxTeams"
          value={project.maxTeams}
          placeholder="Enter max number of teams"
          onChange={handleChange}
          required
        />

        <label>Team Members per Team</label>
        <input
          type="number"
          name="teamMembers"
          value={project.teamMembers}
          placeholder="Enter max members per team"
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={project.description}
          placeholder="Enter project description"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProjects;
