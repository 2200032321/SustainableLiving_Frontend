import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Courses.css';

Modal.setAppElement('#root'); // Ensure this matches your root element

const Courses = () => {
  const [courses, setCourses] = useState([]); // State to store courses from the backend
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/viewcourses'); // Adjust the URL to match your backend
        const data = await response.json();
        setCourses(data); // Update state with the fetched courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  const openModal = (course) => {
    setSelectedCourse(course);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="courses-page">
      <h2 className="courses-heading">Sustainable Environment Courses</h2>
      <div className="courses-container">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <button className="details-button" onClick={() => openModal(course)}>
                  More Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>

      {selectedCourse && (
        <div className="course-overlay" onClick={closeModal}>
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCourse.title}</h2>
            <img src={selectedCourse.image} alt={selectedCourse.title} className="modal-image" />
            <p><strong>Description:</strong> {selectedCourse.details}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
