const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const { SESSION_ID, BOT_NAME, OWNER_NAME, OWNER_NUMBER } = require('./config');

const app = express();

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async m => {
    const msg = m.messages[0];
    if (!msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (text && text.toLowerCase() === '.menu') {
      await sock.sendMessage(msg.key.remoteJid, { text: `👋 HELLO! DILSHAN MD BOT ${BOT_NAME} 😎` });
    }
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      qrcode.generate(qr, { small: true });
    }
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        connectBot();
      }
    } else if (connection === 'open') {
      console.log('✅ බොට් එක සාර්ථකව සම්බන්ධ වුණා!');
    }
  });
}
module.exports = {
  name: 'menu',
  description: 'Show main menu',
  async execute(sock, m, args) {
    const menuText = `
*👋 _𝐇𝐄𝐋𝐋𝐎𝐖_* 👉No name👈
🫟 *Wᴇʟᴄᴏᴍᴇ Tᴏ DILSHAN-MD*🫟

*╭─「 ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ 」*
*│*👾 *\`Bot\`*= *DILSHAN-MD*
*│*👤 *\`User\`*= 👉No name👈
*│*☎️ *\`Owner Number\`*= 94772194789
*│*⏰ *\`Uptime\`*= Live
*│*✒️ *\`Prefix\`*= . 
*╰──────────●●►*

🔢 Reply with numbers below:

1 │❯❯◦ OWNER MENU
2 │❯❯◦ AI MENU
3 │❯❯◦ FUN MENU
4 │❯❯◦ GROUP MENU
5 │❯❯◦ DOWNLOAD MENU
6 │❯❯◦ SEARCH MENU

*㋛ POWERED BY DILSHAN 〽️MD*
    `;
    await sock.sendMessage(m.key.remoteJid, { text: menuText }, { quoted: m });
  }
};
