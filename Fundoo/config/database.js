const mongoose = require("mongoose");

const database = async () => {
  try {
    const DATABASE = process.env.DATABASE_url;

    await mongoose.connect(DATABASE);

    console.log("Connected to the database.");
  } catch (error) {
    console.log("Could not connect to the database.", error);
  }
};

// export the database
module.exports = database;