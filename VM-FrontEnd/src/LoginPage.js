import React, { useState } from 'react';

import './LoginPage.css'; // Add your CSS styles here

// Your other imports...

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform authentication here by sending a POST request to your backend service
    // You can use fetch or axios for making the API call
    // Replace 'YOUR_BACKEND_API_URL' with your actual backend API endpoint
    try {
      const response = await fetch('http://localhost:8004/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("response login : "+response);
      if (response.ok) {
        setIsLoggedIn(true);
        onLogin(); // Notify the parent component about successful login
      } else {
        setIsLoggedIn(false);
        setErrorMsg("Invalid Username or Password");
        // Handle authentication error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };

  return (
    <div >
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="username">Username:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password">Password:</label>
                </td>
                <td>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button type="submit">Login</button>
                  {errorMsg && (
        
        <div className="error-message">
        {errorMsg}</div>
    )}
                </td>
              </tr>
            </tbody>
          </table>
        </form>
       
      </div>
    </div>
  );
}

// Your other components and routes...

export default LoginPage;
