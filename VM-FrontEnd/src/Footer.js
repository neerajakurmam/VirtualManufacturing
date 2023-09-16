// Footer.js

import React from 'react';
import './Footer.css'; // Add your CSS styles here

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Virtual Manufacturing</p>
    </footer>
  );
}

export default Footer;
