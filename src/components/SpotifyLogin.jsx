// src/components/SpotifyLogin.jsx
import React, { useEffect, useState } from 'react';
import SpotifyLoginbtn from './SpotifyLoginbtn';
import { getTokenFromUrl } from './Action/Spotify'; // Ensure the import path is correct
import { Button } from '@mui/material'; // Import MUI Button

const SpotifyLogin = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromUrl = getTokenFromUrl(); // Use the function to get the token from the URL
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken && tokenFromUrl) {
      window.localStorage.setItem("token", tokenFromUrl); // Store token in local storage
      setToken(tokenFromUrl); // Set token in state
      window.location.hash = ""; // Clear the URL hash after getting the token
    } else {
      setToken(storedToken); // If a token is already stored, set it in state
    }
  }, []);

  const handleLogout = () => {
    setToken(null); // Clear token in state
    window.localStorage.removeItem("token"); // Remove token from local storage
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Welcome, you're logged in!</h1> {/* Welcome message */}
          <Button variant="contained"  onClick={handleLogout}>
            LOGOUT
          </Button> {/* MUI styled logout button */}
        </div>
      ) : (
        <SpotifyLoginbtn />
      )}
    </div>
  );
}

export default SpotifyLogin;
