const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { sequelize, Technology, Question, Game } = require("./models/index");
const seedDatabase = require("./models/seed");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend accessibility
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(process.cwd(), "../frontend/dist")));

// In-memory store for game sessions to keep them secure and backend-driven
const activeGames = {};

// History to avoid serving same questions consecutively
let recentQuestionIds = [];

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
    // Pick a random question from the database, excluding recently served questions
    const allQuestions = await Question.findAll();
    if (!allQuestions || allQuestions.length === 0) {
      return res.status(500).json({ error: "No questions found in the database. Please seed first." });
    }

    let availableQuestions = allQuestions.filter(q => !recentQuestionIds.includes(q.id));
    if (availableQuestions.length === 0) {
      // Reset if all questions have been served recently
      recentQuestionIds = [];
      availableQuestions = allQuestions;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];

    // Track recently served questions
    recentQuestionIds.push(question.id);
    if (recentQuestionIds.length > 8) {
      recentQuestionIds.shift(); // Keep history size to last 8 questions
    }

    const correctIds = question.correctAnswerIds.split(",");
    
    // Get all technologies from the database
    const allTechs = await Technology.findAll({
      attributes: ["id", "name", "image"]
    });

    // Separate correct technologies and potential distractors
    const correctTechs = allTechs.filter(t => correctIds.includes(t.id));
    const distractorPool = allTechs.filter(t => !correctIds.includes(t.id));

    // We need 15 items total in the grid (5x3 or 3x5)
    const neededDistractorsCount = 15 - correctTechs.length;
    
    // Shuffle the distractor pool and slice the needed number
    const shuffledDistractors = shuffleArray(distractorPool);
    const selectedDistractors = shuffledDistractors.slice(0, neededDistractorsCount);

    // Combine correct technologies and distractors, then shuffle the 15 items
    const gridItems = shuffleArray([...correctTechs, ...selectedDistractors]);

    // Create a unique game ID
    const gameId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Save session details securely on the backend
    activeGames[gameId] = {
      gameId,
      questionId: question.id,
      correctAnswers: correctIds,
      isCompleted: false,
      startTime: Date.now()
    };

    console.log(`[Game Started] Session: ${gameId} | Question: "${question.questionText}"`);

    // Return game details to frontend (now including correctAnswers to perform frontend validation)
    res.json({
      gameId,
      questionText: question.questionText,
      grid: gridItems, // Array of 15 shuffled technologies (id, name, image-svg)
      correctAnswers: correctIds, // Return correct answer IDs to let frontend validate choices
      correctCountNeeded: 3 // Require user to guess exactly 3 correct answers
    });
  } catch (error) {
    console.error("Error starting game:", error);
    res.status(500).json({ error: "Failed to initialize game session." });
  }
});

// 2. Endpoint: Validate and log a finished game
app.post("/api/game/finish", async (req, res) => {
  const { gameId, won, timeElapsed, guesses } = req.body;

  if (!gameId || guesses === undefined) {
    return res.status(400).json({ error: "Missing gameId or guesses." });
  }

  const session = activeGames[gameId];
  if (!session) {
    return res.status(404).json({ error: "Active game session not found." });
  }

  // Check if session is already completed
  if (session.isCompleted) {
    return res.json({
      error: "This game session is already completed.",
      isCompleted: true
    });
  }

  // Backend verification of the won state
  let backendWon = won;
  const correctGuesses = guesses.filter(id => session.correctAnswers.includes(id));
  
  if (won && correctGuesses.length < 3) {
    console.warn(`[Cheat Detection] Client claimed win, but only had ${correctGuesses.length} correct guesses.`);
    backendWon = false;
  }

  // Calculate and bound timeElapsed
  const actualTimeElapsed = (Date.now() - session.startTime) / 1000;
  let finalTimeElapsed = timeElapsed;

  // Verify time elapsed with a network latency buffer
  if (actualTimeElapsed > 40.8) {
    backendWon = false;
    finalTimeElapsed = 40.0;
  }

  session.isCompleted = true;
  session.won = backendWon;
  session.endTime = Date.now();

  console.log(`[Game Finished] Session: ${gameId} | Won: ${backendWon} | Time Taken: ${finalTimeElapsed}s`);

  // Log completed games to PostgreSQL database using Sequelize Game model
  try {
    await Game.create({
      questionId: session.questionId,
      won: backendWon,
      timeElapsed: parseFloat(Math.min(40.0, finalTimeElapsed).toFixed(2))
    });
    console.log(`[Database Logged] Game session ${gameId} saved successfully.`);
  } catch (dbErr) {
    console.error("Database log failed on game finish:", dbErr);
  }

  res.json({
    success: true,
    isCompleted: true,
    won: backendWon,
    timeElapsed: parseFloat(Math.min(40.0, finalTimeElapsed).toFixed(2))
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "../frontend/dist", "index.html"));
});

// Start Express server and connect/sync the PostgreSQL database
async function startServer() {
  console.log("Checking database connection and seeding mock data...");
  //await seedDatabase();

  app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`DevTalks Backend running on port ${PORT}`);
    console.log(`========================================`);
  });
}

startServer();