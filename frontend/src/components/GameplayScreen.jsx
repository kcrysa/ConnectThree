import React, { useState, useEffect, useRef } from 'react';

function GameplayScreen({ gameData, onGameFinished }) {
  const { gameId, questionText, grid, correctAnswers, correctCountNeeded } = gameData;

  const [timeLeft, setTimeLeft] = useState(40);
  const [guesses, setGuesses] = useState({}); // techId -> { correct: boolean }
  const [guessesMade, setGuessesMade] = useState(0);
  const [answersFoundCount, setAnswersFoundCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [won, setWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isNetworkLoading, setIsNetworkLoading] = useState(false);

  const timerRef = useRef(null);
  const timeLeftRef = useRef(40);

  // Sync timeLeft ref to read it inside async callbacks
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

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
    const finalGuesses = Object.keys(guesses);
    try {
      const response = await fetch(`/api/game/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId,
          won: false,
          timeElapsed: 40.0,
          guesses: finalGuesses
        })
      });
      const data = await response.json();
      
      setIsCompleted(true);
      setWon(false);
      setTimeElapsed(40.0);
    } catch (error) {
      console.error("Timeout finish request failed:", error);
      // Fallback local state
      setIsCompleted(true);
      setWon(false);
      setTimeElapsed(40.0);
    } finally {
      setIsNetworkLoading(false);
    }
  };

  // 3. Handle Card Click / Guess (Entirely on Frontend!)
  const handleCardClick = async (techId) => {
    // Guard clauses: ignore if completed, loading, already guessed, or guesses exhausted
    if (isCompleted || isNetworkLoading || techId in guesses || guessesMade >= 5) {
      return;
    }

    // 1. Check guess correctness against the client-side correctAnswers list
    const isCorrect = correctAnswers.includes(techId);
    const newGuesses = {
      ...guesses,
      [techId]: { correct: isCorrect }
    };
    
    const newGuessesMade = guessesMade + 1;
    const newAnswersFoundCount = answersFoundCount + (isCorrect ? 1 : 0);

    // Update local state instantly
    setGuesses(newGuesses);
    setGuessesMade(newGuessesMade);
    setAnswersFoundCount(newAnswersFoundCount);

    const calculatedTimeElapsed = parseFloat((40 - timeLeftRef.current).toFixed(2));

    // 2. Check Game Winning/Losing Conditions
    // Condition A: SUCCESS - User found exactly 3 correct answers (any 3)
    const hasWonGame = newAnswersFoundCount === 3;

    // Condition B: FAILURE - Guesses exhausted (5 guesses used) without finding 3 correct answers
    const guessesExhausted = newGuessesMade >= 5 && !hasWonGame;

    if (hasWonGame || guessesExhausted) {
      // Stop the timer instantly
      if (timerRef.current) clearInterval(timerRef.current);
      
      setIsNetworkLoading(true);
      try {
        const finalGuessesList = Object.keys(newGuesses);
        const response = await fetch(`/api/game/finish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gameId,
            won: hasWonGame,
            timeElapsed: calculatedTimeElapsed,
            guesses: finalGuessesList
          })
        });
        const data = await response.json();
        
        setIsCompleted(true);
        setWon(data.won);
        setTimeElapsed(data.timeElapsed);
      } catch (error) {
        console.error("Finish request failed:", error);
        // Fallback local completion
        setIsCompleted(true);
        setWon(hasWonGame);
        setTimeElapsed(calculatedTimeElapsed);
      } finally {
        setIsNetworkLoading(false);
      }
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

      {/* 5x3 / 3x5 Technology Grid */}
      <div className="tech-grid">
        {grid.map((tech) => {
          const isGuessed = tech.id in guesses;
          const isCorrect = isGuessed && guesses[tech.id].correct;
          const isIncorrect = isGuessed && !guesses[tech.id].correct;
          const isCorrectHighlight = isCompleted && !isGuessed && !won && correctAnswers.includes(tech.id);

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