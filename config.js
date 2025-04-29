const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const fs = require('fs');

// Logging setup
const logger = pino({ level: 'info' });

const app = express();

// Bot's configuration
const SESSION_ID = 'example_session_id';  // ඔබගේ session ID එක මෙහි දාන්න
const ALIVE_IMG = process.env.ALIVE_IMG || 'https://example.com/your-image-url.jpg'; // Alive status එකේ image URL එක
const ALIVE_MSG = process.env.ALIVE_MSG || '👋Hello, I am DILSHAN MD Bot!'; // Alive status message එක
const OWNER_NUMBER = '94772194789';  // Owner ගේ number එක
const BOT_NAME = 'DILSHAN-MD';  // Bot එකේ නම

// Session එකේ path එක
const SESSION_DIR = `./sessions/SESSION_ID`;

// WhatsApp Bot එක සම්බන්ධ කිරීමේ function එක
const connectBot = async () => 
  const  state, saveCreds  = await useMultiFileAuthState(SESSION_DIR);

  const sock = makeWASocket(
    auth: state,
    printQRInTerminal: true,
  );

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async (m) => 
    const msg = m.messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (text        text.toLowerCase() === '.menu') 
      // '.menu' ටයිප් කරන විට menu එක පවරන්න
      await sock.sendMessage(msg.key.remoteJid, 
        text: `
👋 _𝐇𝐄𝐋𝐋𝐎𝐖_ 👉{BOT_NAME}👈
🫟 *Welcome to ${BOT_NAME}* 🫟

╭─「 ꜱᴛᴀᴛᴜꜱ 」
│👾 Bot:{BOT_NAME}  
│👤 User: msg.pushName || 'User'  
│☎️ Owner:{OWNER_NUMBER}  
│⏰ Uptime: X hours  
╰─────────────
Type a number to choose a menu.
1. Owner Menu  
2. Group Menu  
3. Fun Menu  
...
`
      });
    }
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, qr } = update;
    if (qr) {
      // Connection එක update වීමේදී QR code එක generate කරන්න
      qr.generate(qr, { small: true });
    }
    if (connection === 'close') {
      // Connection එක close වුනොත් නැවත connect කරන්න
      connectBot();
    }
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
  });

  return sock;
};

// Bot එක connect කිරීම
connectBot();
