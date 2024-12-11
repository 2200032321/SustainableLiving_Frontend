import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Courses from './components/Courses';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddCourses from './components/AddCourses';
import AddProjects from './components/AddProjects';
import './App.css';
import ViewCourses from './components/ViewCourses';

function App() {
  const [userRole, setUserRole] = useState(null); // 'user' or 'admin'

  // Check localStorage for the login state on initial load
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole); // Restore the user's role
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role); // Persist the role
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole'); // Clear login state
  };

  return (
    <Router>
      <div className="App">
        <Navbar role={userRole} onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={userRole ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/register" element={<RegisterForm />} />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={userRole === 'user' ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/projects"
            element={userRole === 'user' ? <Projects /> : <Navigate to="/login" />}
          />
          <Route
            path="/courses"
            element={userRole === 'user' ? <Courses /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={userRole === 'user' ? <Profile /> : <Navigate to="/login" />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={userRole === 'admin' ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-projects"
            element={userRole === 'admin' ? <AddProjects /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-courses"
            element={userRole === 'admin' ? <AddCourses /> : <Navigate to="/login" />}
          />
          <Route path="/view-courses" element={<ViewCourses />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
