// src/components/SpotifyLoginbtn.jsx
import { Button } from '@mui/material';
import React from 'react';
import { loginUrl } from './Action/Spotify'; // Ensure the import path is correct

export default function SpotifyLoginbtn() {
  return (
    <Button href={loginUrl} target="_blank" variant="contained">
      LOGIN
    </Button>
  );
}
