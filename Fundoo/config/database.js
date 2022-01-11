const mongoose = require("mongoose");
const logger = require('../config/logger');

const database = async () => {
  try {
    const DATABASE = process.env.DATABASE_url;

    await mongoose.connect(DATABASE);

    console.log("Connected to the database.");
    logger.info("Connected to the database.");
  } catch (error) {
    logger.error("Could not connect to the database.", error);
  }
};

// export the database
module.exports = database;