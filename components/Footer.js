import React, { useState } from 'react';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  const [footerContent, setFooterContent] = useState(null);

  // Function to handle link click and display content
  const handleLinkClick = (content) => {
    setFooterContent(content);
    // Set a timer to reset the footer content after 10 seconds
    setTimeout(() => {
      setFooterContent(null);
    }, 10000);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>ENIVRON</h3>
          <p>&copy; {new Date().getFullYear()} ENVIRON. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-right">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#" onClick={() => handleLinkClick("About Us: We are a company dedicated to providing the best services.")}>About Us</a>
            </li>
            <li>
              <a href="#" onClick={() => handleLinkClick("Services: We offer a wide range of services to cater to your needs.")}>Services</a>
            </li>
            <li>
              <a href="#" onClick={() => handleLinkClick("Contact: Reach us at info@yourcompany.com or call us at +123 456 7890.")}>Contact</a>
            </li>
            <li>
              <a href="#" onClick={() => handleLinkClick("Privacy Policy: We value your privacy and ensure the protection of your data.")}>Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: info@ENIRON.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      {/* Show dynamic footer content if available */}
      {footerContent && (
        <div className="footer-info">
          <p>{footerContent}</p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
