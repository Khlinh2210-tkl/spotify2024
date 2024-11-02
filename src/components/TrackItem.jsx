import React, { useState, useRef, useEffect } from 'react';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const TrackItem = ({ track, isPlaying, onPlay, col, row }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      onPlay(track.track.id); // Notify parent that this track is now playing
    }
  };

  const handleEnded = () => {
    setCurrentTime(0); // Reset current time when track ends
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime * 1000); // Update current time in milliseconds
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateCurrentTime);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, [isPlaying]);

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%', maxWidth: '250px' }}>
      <img
        {...srcset(track.track.album.images[0].url, 230, col, row)}
        loading="lazy"
        alt={`${track.track.name} album cover`}
        style={{ 
          width: '100%', 
          borderRadius: '8px', 
          marginBottom: '10px', 
          border: '4px solid white', 
          padding: '2px' 
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <p style={{ fontWeight: 'bold' }}>{track.track.name}</p>
        <p>{track.track.artists.map(artist => artist.name).join(', ')}</p>
        
        {track.track.preview_url ? (
          <>
            <audio
              ref={audioRef}
              src={track.track.preview_url}
              onEnded={handleEnded}
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <div 
                onClick={handlePlayPause} 
                style={{ 
                  cursor: 'pointer', 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: isPlaying ? 'rgba(29, 185, 84, 0.8)' : 'rgba(29, 185, 84, 0.5)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '10px',
                }}
              >
                {isPlaying ? (
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '8px', height: '20px', backgroundColor: 'white', marginRight: '4px' }} />
                    <div style={{ width: '8px', height: '20px', backgroundColor: 'white' }} />
                  </div>
                ) : (
                  <div style={{ width: 0, height: 0, borderLeft: '15px solid white', borderTop: '10px solid transparent', borderBottom: '10px solid transparent' }} />
                )}
              </div>
              
              {/* Progress bar */}
              <div style={{ flexGrow: 1 }}>
                <input
                  type="range"
                  value={(currentTime / track.track.duration_ms) * 100 || 0}
                  onChange={(e) => {
                    const newTime = (e.target.value / 100) * track.track.duration_ms;
                    audioRef.current.currentTime = newTime / 1000; // Set current time in seconds
                    setCurrentTime(newTime); // Update current time state
                  }}
                  style={{ 
                    width: '100%', 
                    appearance: 'none', 
                    height: '4px', 
                    backgroundColor: '#ccc', 
                    outline: 'none',
                    borderRadius: '2px'
                  }}
                />
                {/* Time display */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'gray', marginTop: '5px' }}>
                  <span>{formatDuration(currentTime)}</span>
                  <span>{formatDuration(track.track.duration_ms)}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No preview available</p>
        )}
      </div>
    </div>
  );
};

export default TrackItem;
