// src/Action/Spotify.js
const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT; 
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative"
];

// Generate the login URL
export const loginUrl = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;

// Function to extract the access token from the URL
export function getTokenFromUrl() {
  const hash = window.location.hash;
  const token = hash.substring(1).split('&').reduce((initial, item) => {
    const parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});

  return token.access_token; // Return the access token
}
