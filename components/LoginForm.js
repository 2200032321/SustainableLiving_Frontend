import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Admin Login Logic
    if (email === 'Hello143@gmail.com' && password === '143') {
      onLoginSuccess('admin'); // Notify parent about admin login
      setTimeout(() => {
        navigate('/admin'); // Redirect to admin page after successful login
      }, 100); // Add a small delay for a smoother experience
      return;
    }

    // Regular User Login Logic
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // No CAPTCHA response needed
      });

      if (!response.ok) {
        // Handle non-2xx responses
        if (response.status === 401) {
          throw new Error('Invalid credentials. Please try again.');
        } else {
          throw new Error('An unexpected error occurred. Please try later.');
        }
      }

      const data = await response.json();
      if (data.message === 'Login successful') {
        // Store user details in localStorage (or state management)
        localStorage.setItem('user', JSON.stringify(data.user));

        onLoginSuccess('user'); // Notify parent about user login
        navigate('/profile'); // Redirect user to the profile page
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <div className="full-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
