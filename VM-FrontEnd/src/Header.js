// Header.js

import React from 'react';
import './Header.css'; // Add your CSS styles here

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/newproject">New Project</a></li>
          <li><a href="/projectlist">Project List</a></li>
          <li><a href="/editprofile">Edit Profile</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
