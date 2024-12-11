import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot instead of render
import App from './App';
import './index.css'; // Your main styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
