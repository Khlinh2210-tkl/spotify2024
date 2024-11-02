import React, { useEffect, useState } from 'react';
import TrackItem from './TrackItem';
import { getTokenFromUrl } from './Action/Spotify';
import { ImageListItem, ImageList } from '@mui/material';

const PlaylistTrack = () => {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playingTrackId, setPlayingTrackId] = useState(null); // Track ID of the currently playing track

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const tokenFromUrl = getTokenFromUrl().access_token;
      window.location.hash = "";
      window.localStorage.setItem("token", tokenFromUrl);
      token = tokenFromUrl;
    }
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      const playlistId = "54ZA9LXFvvFujmOVWXpHga"; // Replace with your playlist ID
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setTracks(data.items);
        })
        .catch(error => console.error("Error fetching tracks", error));
    }
  }, [token]);

  const handleTrackPlay = (trackId) => {
    setPlayingTrackId(trackId); // Set the track ID of the currently playing track
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Playlist Tracks</h1>
      <ImageList
        sx={{
          width: '100%',
          height: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {tracks.map((item) => (
          <ImageListItem key={item.track.id} cols={1} rows={1}>
            <TrackItem 
              track={item} 
              isPlaying={item.track.id === playingTrackId} // Determine if this track is playing
              onPlay={handleTrackPlay} // Pass the play handler
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default PlaylistTrack;
