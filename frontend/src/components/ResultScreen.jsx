import React, { useEffect, useRef } from 'react';

function ResultScreen({ gameResult, onReset }) {
  const { won, timeElapsed, questionText, guessesMade } = gameResult;
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Confetti Particle System for Winning screen
  useEffect(() => {
    if (!won || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Fit canvas to its relative parent container
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const colors = ['#00d2ff', '#7928ca', '#ff007a', '#00ff87', '#ffcc00'];
    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height - 20,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 4 - 2,
      speedY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 4 - 2
    }));

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let activeParticles = false;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Bounce horizontally off walls
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;

        // Recycle particle when it goes off screen bottom
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 3 + 2;
        } else {
          activeParticles = true;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (activeParticles) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [won]);

  return (
    <div className="glass-panel fade-in" style={{ minHeight: '380px', position: 'relative' }}>
      
      {/* Confetti canvas rendered over container if Won */}
      {won && (
        <canvas 
          ref={canvasRef} 
          className="confetti-canvas"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', borderRadius: '24px' }}
        />
      )}

      {won ? (
        // SUCCESS CASE
        <>
          <div className="animation-container">
            <div className="success-halo">
              <svg viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Congratulations!
          </h1>
          
          <div className="stats-info">
            You solved the question in <span>{timeElapsed}s</span> using <span>{guessesMade}</span> guesses!
          </div>
        </>
      ) : (
        // FAILURE CASE
        <>
          <div className="animation-container">
            <div className="failure-halo">
              <svg viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>

          <h1 className="title-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #ffffff 10%, #f43f5e 100%)', webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent' }}>
            Better Luck Next Time!
          </h1>
          
          <div className="stats-info" style={{ fontSize: '1.15rem', color: '#94a3b8' }}>
            You ran out of time or used up all 5 attempts. Don't worry, you can always try again!
          </div>
        </>
      )}

      <div style={{ zIndex: 10, marginTop: '1rem' }}>
        <button 
          className="btn-secondary" 
          onClick={onReset}
          aria-label="Restart the application flow"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
