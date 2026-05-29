import React from 'react';

function StartScreen({ onStart }) {
  return (
    <div className="glass-panel fade-in">
      {/* Decorative Radial Backdrop Lights */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "30%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      
      {/* Pulsing Play SVG Graphic Card */}
      <div className="play-svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="50%" stopColor="#7928ca" />
              <stop offset="100%" stopColor="#ff007a" />
            </linearGradient>
          </defs>
          {/* Glowing Play Triangle */}
          <path d="M40,30 L73,50 L40,70 Z" />
          {/* Tech Circles orbits */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#playGrad)" strokeWidth="2" strokeDasharray="6 8" />
        </svg>
      </div>

      <h1 className="title-gradient">
        VOIS@DevTalks 2026
        <br />
        Tech Trivia
      </h1>

      <p className="sub-title">
        Test your full-stack expertise!
        <br />
        A random question will connect 3 tech elements in a grid.
        <br />
        Can you find them in 40 seconds?
      </p>

      <button 
        className="btn-primary" 
        onClick={onStart}
        aria-label="Touch here to play DevTalks Trivia"
      >
        <span>Touch here to play</span>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default StartScreen;