const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize, Technology, Question, Game } = require("./models/index");
const seedDatabase = require("./models/seed");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend accessibility
app.use(cors());
app.use(express.json());

// In-memory store for game sessions to keep them secure and backend-driven
const activeGames = {};

// Helper to shuffle arrays (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 1. Endpoint: Start a brand new game
app.post("/api/game/start", async (req, res) => {
  try {
    // Pick a random question from the database
    const question = await Question.findOne({
      order: sequelize.random()
    });

    if (!question) {
      return res.status(500).json({ error: "No questions found in the database. Please seed first." });
    }

    const correctIds = question.correctAnswerIds.split(",");
    
    // Get all technologies from the database
    const allTechs = await Technology.findAll({
      attributes: ["id", "name", "image"]
    });

    // Separate correct technologies and potential distractors
    const correctTechs = allTechs.filter(t => correctIds.includes(t.id));
    const distractorPool = allTechs.filter(t => !correctIds.includes(t.id));

    // We need 16 items total in the grid (4x4)
    const neededDistractorsCount = 16 - correctTechs.length;
    
    // Shuffle the distractor pool and slice the needed number
    const shuffledDistractors = shuffleArray(distractorPool);
    const selectedDistractors = shuffledDistractors.slice(0, neededDistractorsCount);

    // Combine correct technologies and distractors, then shuffle the 16 items
    const gridItems = shuffleArray([...correctTechs, ...selectedDistractors]);

    // Create a unique game ID
    const gameId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Save session details securely on the backend
    activeGames[gameId] = {
      gameId,
      questionId: question.id, // Reference the DB Question ID
      questionText: question.questionText,
      correctAnswers: correctIds,
      guessesMade: 0,
      guesses: {}, // techId -> boolean (correct/incorrect)
      correctAnswersFoundCount: 0,
      isCompleted: false,
      won: false,
      startTime: Date.now()
    };

    console.log(`[Game Started] Session: ${gameId} | Question: "${question.questionText}"`);

    // Return game details to frontend (excluding the actual answers array to prevent cheating!)
    res.json({
      gameId,
      questionText: question.questionText,
      grid: gridItems, // Array of 16 shuffled technologies (id, name, image-svg)
      correctCountNeeded: correctIds.length
    });
  } catch (error) {
    console.error("Error starting game:", error);
    res.status(500).json({ error: "Failed to initialize game session." });
  }
});

// 2. Endpoint: Validate a user guess
app.post("/api/game/guess", async (req, res) => {
  const { gameId, techId } = req.body;

  if (!gameId || !techId) {
    return res.status(400).json({ error: "Missing gameId or techId." });
  }

  const session = activeGames[gameId];
  if (!session) {
    return res.status(404).json({ error: "Active game session not found." });
  }

  // Check if session is already completed
  if (session.isCompleted) {
    return res.json({
      error: "This game session is already completed.",
      isCompleted: true,
      won: session.won,
      guessesMade: session.guessesMade,
      timeElapsed: ((session.endTime || Date.now()) - session.startTime) / 1000,
      correctAnswers: session.correctAnswers
    });
  }

  // Check if techId has already been guessed in this session
  if (techId in session.guesses) {
    return res.status(400).json({ error: "This technology has already been guessed." });
  }

  // Calculate elapsed time (limit game strictly to 40 seconds + small network buffer)
  const timeElapsed = (Date.now() - session.startTime) / 1000;
  if (timeElapsed > 40.8) {
    session.isCompleted = true;
    session.won = false;
    session.endTime = Date.now();
    
    // Log the timed out game in the database
    try {
      await Game.create({
        questionId: session.questionId,
        won: false,
        timeElapsed: 40.0
      });
    } catch (dbErr) {
      console.error("Database log failed on timeout inside guess:", dbErr);
    }

    return res.json({
      correct: false,
      guessesMade: session.guessesMade,
      guessesLeft: 0,
      isCompleted: true,
      won: false,
      timeElapsed: 40.0,
      reason: "Time expired!",
      correctAnswers: session.correctAnswers
    });
  }

  // Validate the guess
  const isCorrect = session.correctAnswers.includes(techId);
  session.guessesMade += 1;
  session.guesses[techId] = isCorrect;

  if (isCorrect) {
    session.correctAnswersFoundCount += 1;
  }

  // Determine game status
  // 1. Success condition: User found ALL correct answers (at least 3)
  const foundAll = session.correctAnswers.every(id => session.guesses[id] === true);
  
  // 2. Failure condition: Guesses exhausted (5 guesses used) and still haven't found all
  const guessesExhausted = session.guessesMade >= 5;

  if (foundAll) {
    session.isCompleted = true;
    session.won = true;
    session.endTime = Date.now();
    console.log(`[Game Success] Session: ${gameId} solved in ${((session.endTime - session.startTime) / 1000).toFixed(2)}s`);
  } else if (guessesExhausted) {
    session.isCompleted = true;
    session.won = false;
    session.endTime = Date.now();
    console.log(`[Game Failed] Session: ${gameId} failed (guesses exhausted)`);
  }

  const finalTimeElapsed = ((session.endTime || Date.now()) - session.startTime) / 1000;

  // Log completed games to database
  if (session.isCompleted) {
    try {
      await Game.create({
        questionId: session.questionId,
        won: session.won,
        timeElapsed: parseFloat(finalTimeElapsed.toFixed(2))
      });
      console.log(`[Database Logged] Game session ${gameId} saved. Won: ${session.won}`);
    } catch (dbErr) {
      console.error("Database log failed on guess completion:", dbErr);
    }
  }

  res.json({
    correct: isCorrect,
    guessesMade: session.guessesMade,
    guessesLeft: Math.max(0, 5 - session.guessesMade),
    isCompleted: session.isCompleted,
    won: session.won,
    correctAnswersCount: session.correctAnswers.length,
    foundAnswersCount: session.correctAnswersFoundCount,
    timeElapsed: parseFloat(finalTimeElapsed.toFixed(2)),
    correctAnswers: session.isCompleted ? session.correctAnswers : undefined
  });
});

// 3. Endpoint: Handle frontend-initiated timeouts
app.post("/api/game/timeout", async (req, res) => {
  const { gameId } = req.body;

  if (!gameId) {
    return res.status(400).json({ error: "Missing gameId." });
  }

  const session = activeGames[gameId];
  if (!session) {
    return res.status(404).json({ error: "Active game session not found." });
  }

  // Mark session completed and lost due to timeout
  if (!session.isCompleted) {
    session.isCompleted = true;
    session.won = false;
    session.endTime = Date.now();
    console.log(`[Game Timeout] Session: ${gameId} timed out`);

    // Log the timed out game in the database
    try {
      await Game.create({
        questionId: session.questionId,
        won: false,
        timeElapsed: parseFloat(Math.min(40.0, (session.endTime - session.startTime) / 1000).toFixed(2))
      });
      console.log(`[Database Logged] Timeout session ${gameId} saved.`);
    } catch (dbErr) {
      console.error("Database log failed on timeout endpoint:", dbErr);
    }
  }

  const timeElapsed = ((session.endTime || Date.now()) - session.startTime) / 1000;

  res.json({
    isCompleted: true,
    won: session.won,
    guessesMade: session.guessesMade,
    timeElapsed: parseFloat(Math.min(40.0, timeElapsed).toFixed(2)),
    correctAnswers: session.correctAnswers
  });
});

// Start Express server and connect/sync the PostgreSQL database
async function startServer() {
  console.log("Checking database connection and seeding mock data...");
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`DevTalks Backend running on port ${PORT}`);
    console.log(`========================================`);
  });
}

startServer();
