import React, { useState, useEffect } from 'react';
import './ViewProjects.css';

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [updatedProject, setUpdatedProject] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all projects
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/view-projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          setMessage('Failed to fetch projects');
        }
      } catch (error) {
        setMessage('An error occurred while fetching projects');
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (name) => {
    try {
      const response = await fetch(`http://localhost:8080/delete-project?name=${name}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter((project) => project.name !== name));
        setMessage('Project deleted successfully');
      } else {
        setMessage('Failed to delete project');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the project');
    }
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setUpdatedProject(project);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/update-project?name=${updatedProject.name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        setProjects(
          projects.map((project) =>
            project.name === updatedProject.name ? updatedProject : project
          )
        );
        setEditProject(null);
        setMessage('Project updated successfully');
      } else {
        setMessage('Failed to update project');
      }
    } catch (error) {
      setMessage('An error occurred while updating the project');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject({ ...updatedProject, [name]: value });
  };

  return (
    <div className="view-projects">
      <h1>View Projects</h1>
      {message && <p className="message">{message}</p>}

      {editProject ? (
        <div className="edit-project">
          <h2>Edit Project</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <label>Project Name</label>
            <input
              type="text"
              name="name"
              value={updatedProject.name}
              onChange={handleChange}
              readOnly
            />

            <label>Max Teams</label>
            <input
              type="number"
              name="maxTeams"
              value={updatedProject.maxTeams}
              onChange={handleChange}
            />

            <label>Team Members per Team</label>
            <input
              type="number"
              name="teamMembers"
              value={updatedProject.teamMembers}
              onChange={handleChange}
            />

            <label>Description</label>
            <textarea
              name="description"
              value={updatedProject.description}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Update Project</button>
            <button type="button" onClick={() => setEditProject(null)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="project-list">
          {projects.length > 0 ? (
            <ul>
              {projects.map((project) => (
                <li key={project.name} className="project-item">
                  <h3>{project.name}</h3>
                  <p>Max Teams: {project.maxTeams}</p>
                  <p>Team Members: {project.teamMembers}</p>
                  <p>Description: {project.description}</p>
                  <button onClick={() => handleEdit(project)}>Edit</button>
                  <button onClick={() => handleDelete(project.name)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewProjects;
