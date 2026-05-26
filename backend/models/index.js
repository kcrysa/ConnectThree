const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Use connection string (standard for Render, Heroku, AWS, etc.)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: true,
    dialectOptions: {
      // Support SSL connections if needed by production hosting (e.g. Render/Heroku)
      ssl: process.env.DATABASE_URL.includes("localhost") || process.env.DATABASE_URL.includes("127.0.0.1") ? false : {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Fallback to broken down credentials
  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = process.env.DB_PORT || 5432;
  const dbUser = process.env.DB_USER || "postgres";
  const dbPass = process.env.DB_PASSWORD || "postgres";
  const dbName = process.env.DB_NAME || "devtalks";

  sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
    logging: true
  });
}

// Define the Technology model
const Technology = sequelize.define("Technology", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.TEXT, // Store the raw SVG XML string
    allowNull: false
  }
}, {
  timestamps: false
});

// Define the Question model
const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  questionText: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correctAnswerIds: {
    type: DataTypes.STRING, // Comma-separated list of technology IDs (e.g. "react,angular,vue")
    allowNull: false
  }
}, {
  timestamps: false
});

// Define the Game (history) model
const Game = sequelize.define("Game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Questions',
      key: 'id'
    }
  },
  won: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  timeElapsed: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// Establish relationship
Game.belongsTo(Question, { foreignKey: 'questionId' });
Question.hasMany(Game, { foreignKey: 'questionId' });

module.exports = {
  sequelize,
  Technology,
  Question,
  Game
};
