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
      <div className="glass-panel fade-in" style={{ padding: '4rem', display: 'flex', gap: '20px' }}>
        <div 
          style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255, 255, 255, 0.08)',
            borderTop: '4px solid var(--accent-blue)',
            borderRadius: '50%',
            animation: 'spinLoader 1s linear infinite'
          }}
        />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, color: '#94a3b8' }}>
          Initializing Board...
        </div>
        
        {/* Loader Animation Node */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spinLoader {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
      </div>
    );
  }

  // Render current active screen
  switch (screen) {
    case 'game':
      return <GameplayScreen gameData={gameData} onGameFinished={handleGameFinished} />;
    case 'result':
      return <ResultScreen gameResult={gameResult} onReset={handleResetGame} />;
    case 'start':
    default:
      return <StartScreen onStart={handleStartGame} />;
  }
}

export default App;
