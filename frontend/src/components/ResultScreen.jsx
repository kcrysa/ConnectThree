import React, { useEffect, useRef } from "react";

function ResultScreen({ gameResult, onReset }) {
  const { won, timeElapsed, questionText, guessesMade } = gameResult;
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Confetti Particle System for Winning screen
  useEffect(() => {
    if (!won || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Fit canvas to its relative parent container
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const colors = ["#E60000", "#9C2AA0", "#00d2ff", "#00ff87", "#ffcc00"];
    const particles = Array.from({ length: 65 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height - 20,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 4 - 2,
      speedY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 4 - 2,
    }));

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [won]);

  return (
    <div
      className="glass-panel fade-in"
      style={{ padding: "3.5rem 2rem", overflow: "hidden" }}
    >
      {won && <canvas ref={canvasRef} className="confetti-canvas" />}

      {/* Decorative Radial glow lights */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "20%",
          width: "250px",
          height: "250px",
          background: won
            ? "radial-gradient(circle, rgba(0, 255, 135, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(230, 0, 0, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Animated Graphic Indicator */}
      <div className="animation-container">
        {won ? (
          <div className="success-halo">
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        ) : (
          <div className="failure-halo">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        )}
      </div>

      {/* Title Message */}
      <h1
        className="title-gradient"
        style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
      >
        {won ? "Congratulations!" : "Better luck next time"}
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "1.2rem",
          maxWidth: "460px",
          margin: "0 auto 2rem auto",
          lineHeight: "1.6",
        }}
      >
        {won
          ? "Amazing job! You connected the technologies correctly!"
          : "You couldn't find the correct answers in time"}
      </p>

      {/* Stats display */}
      <div className="stats-info">
        Time taken: <span>{timeElapsed.toFixed(1)}s</span>
        <span style={{ margin: "0 15px", color: "#475569" }}>|</span>
        Guesses made: <span>{guessesMade}</span>
      </div>

      {/* Reset button to start over */}
      <button
        className="btn-primary"
        onClick={onReset}
        style={{ marginTop: "1rem" }}
        aria-label="Play DevTalks Trivia again"
      >
        <span>Play Again</span>
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
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      </button>
    </div>
  );
}

export default ResultScreen;
