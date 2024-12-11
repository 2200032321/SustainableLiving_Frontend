import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewCourses.css';

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/viewcourses');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
    }
  };

  const deleteCourse = async (title) => {
    if (window.confirm(`Are you sure you want to delete the course "${title}"?`)) {
      try {
        await axios.delete(`http://localhost:8080/deletecourse`, {
          params: { title },
        });
        alert('Course deleted successfully');
        fetchCourses(); // Refresh the list after deletion
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  const updateCourse = async (title) => {
    const newDetails = prompt('Enter new details for the course:', 'Updated details here');
    if (newDetails) {
      try {
        await axios.put(`http://localhost:8080/updatecourse`, null, {
          params: { title },
        });
        alert('Course updated successfully');
        fetchCourses(); // Refresh the list after update
      } catch (err) {
        alert('Failed to update course');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="view-courses-container">
      <h1>View Courses</h1>
      {error && <p className="error">{error}</p>}
      <table className="courses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.title}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>
                <button onClick={() => updateCourse(course.title)}>Edit</button>
                <button onClick={() => deleteCourse(course.title)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCourses;
