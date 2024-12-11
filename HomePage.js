// HomePage.js
import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to Environ</h1>
        <p>Your portal for sustainable solutions.</p>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Eco-Friendly Products</h3>
            <p>Discover a curated selection of sustainable products for a greener lifestyle.</p>
          </div>
          <div className="feature-item">
            <h3>Community Engagement</h3>
            <p>Join a community dedicated to environmental sustainability and positive change.</p>
          </div>
          <div className="feature-item">
            <h3>Resources & Tips</h3>
            <p>Explore articles, guides, and resources to help you live more sustainably.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Get Started with Environ</h2>
        <p>Sign up to access exclusive content and join a community of like-minded individuals.</p>
        <button onClick={() => alert("Sign Up Clicked!")}>Sign Up</button>
      </section>
    </div>
  );
}

export default HomePage;
