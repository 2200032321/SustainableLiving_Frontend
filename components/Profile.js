import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user data if available
    } else {
      // Redirect to login if no user is found
      window.location.href = '/login';
    }
  }, []);

  if (!user) {
    return <div className="loading">Loading...</div>; // Loading animation
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.name}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default Profile;
