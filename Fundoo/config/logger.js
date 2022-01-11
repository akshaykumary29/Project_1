// import winston logger
const winston = require("winston");
// import path module to handling and transtorming file paths
const path = require("path");

// get started creating a own logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "..", "logs", "error.log"), // the specified path segments into one path.
      level: "error",

      format: winston.format.combine(
        winston.format.timestamp(),
        // winston.format.timestamp( {format: "HH:mm:ss"} ),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "..", "logs", "warn.log"),
      level: "warn",

      format: winston.format.combine(
        winston.format.timestamp(),
        // winston.format.timestamp( {format: "HH:mm:ss"} ),
        winston.format.json()
      ),
    }),

    new winston.transports.File({
      filename: path.join(__dirname, "..", "logs", "info.log"),
      level: "info",

      format: winston.format.combine(
        winston.format.timestamp(),
        // winston.format.timestamp( {format: "HH:mm:ss"} ),
        winston.format.json()
      ),
    }),
  ],
});

module.exports = logger;
