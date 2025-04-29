const fs = require("fs");
if (fs.existsSync("config.env")) require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || "",

  // Bot Prefix
  PREFIX: process.env.PREFIX || ".",

  // Alive message image
  ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/265c6720fc6d6a2f6e1c6.jpg",

  // Alive message text
  ALIVE_MSG:
    process.env.ALIVE_MSG ||
    "👋 Hello! I’m *DILSHAN-MD*, your WhatsApp bot assistant. How can I help you today? 😊",

  // Bot Identity
  BOT_NAME: process.env.BOT_NAME || "DILSHAN-MD",
  OWNER_NAME: process.env.OWNER_NAME || "Dilshan Ashinsa",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94772194789",

  // Port
  PORT: process.env.PORT || "3000",

  // Other config options can go here...
};
