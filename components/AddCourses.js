import React, { useState } from 'react';
import axios from 'axios';
import './AddCourses.css';

const AddCourses = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: '',
    details: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/addcourse', course, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setMessage('Course added successfully!');
        setCourse({ title: '', description: '', duration: '', details: '' });
      }
    } catch (error) {
      console.error('Failed to add course:', error);
      setMessage('Error adding course. Please try again.');
    }
  };

  return (
    <div className="add-courses">
      <h1>Add New Course</h1>
      <form onSubmit={handleSubmit}>
        <label>Course Title</label>
        <input
          type="text"
          name="title"
          value={course.title}
          placeholder="Enter course title"
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={course.description}
          placeholder="Enter course description"
          onChange={handleChange}
          required
        ></textarea>

        <label>Duration (weeks)</label>
        <input
          type="number"
          name="duration"
          value={course.duration}
          placeholder="Enter course duration"
          onChange={handleChange}
          required
        />

        <label>Details</label>
        <textarea
          name="details"
          value={course.details}
          placeholder="Enter additional course details"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Course</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddCourses;
