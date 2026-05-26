const { sequelize, Technology, Question, Game } = require("./index");
const { technologies, questions } = require("../data/seedData");

async function seedDatabase() {
  try {
    // Synchronize models (creates tables if they do not exist)
    console.log("Synchronizing database schema...");
    await sequelize.sync();
    console.log("Database schema synced successfully.");

    // Check if Technologies table already has data
    const techCount = await Technology.count();
    if (techCount === 0) {
      console.log("Technology database is empty. Seeding technologies...");
      await Technology.bulkCreate(technologies);
      console.log(`Successfully seeded ${technologies.length} technologies.`);
    } else {
      console.log(`Technologies table already has ${techCount} entries. Skipping technology seed.`);
    }

    // Check if Questions table already has data
    const questionCount = await Question.count();
    if (questionCount === 0) {
      console.log("Questions database is empty. Seeding questions...");
      
      const formattedQuestions = questions.map(q => ({
        questionText: q.questionText,
        correctAnswerIds: q.correctAnswerIds.join(",") // Comma-separated as requested
      }));

      await Question.bulkCreate(formattedQuestions);
      console.log(`Successfully seeded ${questions.length} questions.`);
    } else {
      console.log(`Questions table already has ${questionCount} entries. Skipping questions seed.`);
    }

    console.log("Database seeding check complete!");
  } catch (error) {
    console.error("Error during database synchronization or seeding:", error);
    console.warn("Please verify that your PostgreSQL server is running and the connection string in backend/.env is correct.");
  }
}

module.exports = seedDatabase;
