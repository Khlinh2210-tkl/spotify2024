// src/App.js
import './App.css';
import PlaylistTrack from './components/PlaylistTrack';
import SpotifyLogin from './components/SpotifyLogin';


function App() {
  return (
    <div className="App">
      <SpotifyLogin />
      <PlaylistTrack />
     
    </div>
  );
}

export default App;
