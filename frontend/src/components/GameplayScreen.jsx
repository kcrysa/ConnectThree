import React, { useState, useEffect, useRef } from 'react';

const BACKEND_URL = 'http://localhost:5000';

function GameplayScreen({ gameData, onGameFinished }) {
  const { gameId, questionText, grid, correctCountNeeded } = gameData;

  const [timeLeft, setTimeLeft] = useState(40);
  const [guesses, setGuesses] = useState({}); // techId -> { correct: boolean }
  const [guessesMade, setGuessesMade] = useState(0);
  const [answersFoundCount, setAnswersFoundCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [won, setWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isNetworkLoading, setIsNetworkLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]); // Missed correct answers sheet

  const timerRef = useRef(null);

  // 1. Timer Logic
  useEffect(() => {
    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 2. Handle Timeout when time runs out (0 seconds)
  const handleTimeout = async () => {
    if (isCompleted) return;
    
    setIsNetworkLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/game/timeout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId })
      });
      const data = await response.json();
      
      setIsCompleted(true);
      setWon(false);
      setTimeElapsed(data.timeElapsed || 40.0);
      setCorrectAnswers(data.correctAnswers || []);
    } catch (error) {
      console.error("Timeout request failed:", error);
      // Fallback local timeout state
      setIsCompleted(true);
      setWon(false);
      setTimeElapsed(40.0);
    } finally {
      setIsNetworkLoading(false);
    }
  };

  // 3. Handle Card Click / Guess
  const handleCardClick = async (techId) => {
    // Guard clauses: ignore if completed, loading, already guessed, or guesses exhausted
    if (isCompleted || isNetworkLoading || techId in guesses || guessesMade >= 5) {
      return;
    }

    setIsNetworkLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/game/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, techId })
      });
      
      const data = await response.json();
      
      if (data.error && !data.isCompleted) {
        alert(data.error);
        return;
      }

      // Record the guess result
      setGuesses((prev) => ({
        ...prev,
        [techId]: { correct: data.correct }
      }));
      setGuessesMade(data.guessesMade);
      setAnswersFoundCount(data.foundAnswersCount);

      // Check if session completed (won or guesses exhausted or backend timeout)
      if (data.isCompleted) {
        setIsCompleted(true);
        setWon(data.won);
        setTimeElapsed(data.timeElapsed);
        setCorrectAnswers(data.correctAnswers || []);
        
        // Stop the timer instantly as requested
        if (timerRef.current) clearInterval(timerRef.current);
      }
    } catch (error) {
      console.error("Guess validation failed:", error);
    } finally {
      setIsNetworkLoading(false);
    }
  };

  // 4. Circular Timer Progress Math
  // Radius = 24, Circumference = 2 * PI * r = ~150.8
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 40) * circumference;

  // Get color for timer ring dynamically based on time remaining
  const getTimerColor = () => {
    if (timeLeft > 20) return '#00ff87'; // Emerald (>20s)
    if (timeLeft > 10) return '#ffcc00';  // Gold (>10s)
    return '#ff3838';                    // Crimson (<=10s)
  };

  return (
    <div className="glass-panel fade-in" style={{ padding: '2rem' }}>
      
      {/* HUD Bar (Status and Countdown) */}
      <div className="status-panel">
        <div className="guesses-counter">
          Guesses: <span>{guessesMade} / 5</span>
          <span style={{ marginLeft: '12px', color: '#94a3b8' }}>|</span>
          <span style={{ marginLeft: '12px' }}>
            Found: <span style={{ color: '#00ff87' }}>{answersFoundCount} / {correctCountNeeded}</span>
          </span>
        </div>

        {/* Circular Countdown Timer */}
        <div className="timer-container" title={`${timeLeft} seconds remaining`}>
          <svg className="timer-circle" width="56" height="56">
            <circle className="timer-bg" cx="28" cy="28" r={radius} />
            <circle 
              className="timer-progress" 
              cx="28" 
              cy="28" 
              r={radius}
              stroke={getTimerColor()}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className={`timer-text ${timeLeft <= 5 ? 'urgent' : ''}`}>
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Dynamic Question Block */}
      <div className="question-container">
        <div className="question-text">
          {questionText}
        </div>
      </div>

      {/* 4x4 Technology Grid */}
      <div className="tech-grid">
        {grid.map((tech) => {
          const isGuessed = tech.id in guesses;
          const isCorrect = isGuessed && guesses[tech.id].correct;
          const isIncorrect = isGuessed && !guesses[tech.id].correct;
          const isCorrectHighlight = isCompleted && !isGuessed && correctAnswers.includes(tech.id);

          return (
            <button
              key={tech.id}
              className={`tech-card 
                ${isCorrect ? 'selected-correct' : ''} 
                ${isIncorrect ? 'selected-incorrect' : ''} 
                ${isCorrectHighlight ? 'correct-highlight' : ''} 
                ${isCompleted && !isGuessed && !isCorrectHighlight ? 'locked' : ''}
              `}
              onClick={() => handleCardClick(tech.id)}
              disabled={isCompleted || isNetworkLoading || isGuessed}
              title={tech.name}
              aria-label={`Select ${tech.name}`}
            >
              {/* Load SVG directly from DB-served data */}
              <div 
                className="icon-holder"
                dangerouslySetInnerHTML={{ __html: tech.image }} 
              />
              <span className="tech-label">{tech.name}</span>
            </button>
          );
        })}
      </div>

      {/* Continue Button appears once game terminates */}
      {isCompleted && (
        <div className="continue-container">
          <button 
            className="btn-primary"
            onClick={() => onGameFinished({ won, timeElapsed, questionText, guessesMade })}
            aria-label="Continue to results screen"
          >
            <span>Continue</span>
            <svg 
              width="18" 
              height="18" 
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
      )}
    </div>
  );
}

export default GameplayScreen;
