import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameplayScreen from './components/GameplayScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [screen, setScreen] = useState('start'); // 'start' | 'game' | 'result'
  const [gameData, setGameData] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Initiate game session from backend database
  const handleStartGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/game/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Database server connection failed.');
      }
      
      const data = await response.json();
      setGameData(data);
      setScreen('game');
    } catch (error) {
      console.error('Error starting game session:', error);
      alert('Could not connect to the trivia database. Please make sure the PostgreSQL Node backend is running and correct connection details are provided in your backend/.env file.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Transition to Results screen
  const handleGameFinished = (resultData) => {
    setGameResult(resultData);
    setScreen('result');
  };

  // 3. Reset game flow (redirect back to first screen)
  const handleResetGame = () => {
    setGameData(null);
    setGameResult(null);
    setScreen('start');
  };

  // Render Loader during game initiation
  if (isLoading) {
    return (
      <div className="glass-panel fade-in" style={{ padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div 
          className="loading-spinner"
          style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255, 255, 255, 0.08)',
            borderTop: '4px solid var(--accent-red)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
        <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>Retrieving trivia board from database...</p>
      </div>
    );
  }

  return (
    <>
      {screen === 'start' && <StartScreen onStart={handleStartGame} />}
      {screen === 'game' && gameData && (
        <GameplayScreen gameData={gameData} onGameFinished={handleGameFinished} />
      )}
      {screen === 'result' && gameResult && (
        <ResultScreen gameResult={gameResult} onReset={handleResetGame} />
      )}
    </>
  );
}

export default App;