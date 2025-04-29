const fs = require('fs');
require('dotenv').config();

module.exports = {
  SESSION_ID: process.env.SESSION_ID || '',
  BOT_NAME: process.env.BOT_NAME || 'DILSHAN-MD',
  OWNER_NAME: process.env.OWNER_NAME || 'Dilshan Ashinsa',
  OWNER_NUMBER: process.env.OWNER_NUMBER || '94772194789'
  ALIVE_IMG: process.env.ALIVE_IMG || ''
  ALIVE_MSG: process.env.ALIVE_MSG || '👋Hello I am DILSHAN MD I am Alive now
