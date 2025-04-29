const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const OWNER_NUMBER = process.env.OWNER_NUMBER || '94772194789'; // ඔබගේ WhatsApp අංකය

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('🛑 සම්බන්ධතාවය වසා ඇත. නැවත සම්බන්ධ වීම:', shouldReconnect);
      if (shouldReconnect) {
        startBot();
      }
    }

    if (connection === 'open') {
      console.log('✅ Bot සාර්ථකව සම්බන්ධ වී ඇත!');

      const jid = OWNER_NUMBER + '@s.whatsapp.net';
      await sock.sendMessage(jid, { text: '🤖 ඔබගේ WhatsApp Bot එක දැන් සක්‍රීයයි!' });

      // Session ID ලබා දීම
      const sessionInfo = {
        creds: state.creds,
        keys: state.keys,
      };
      const sessionString = JSON.stringify(sessionInfo, null, 2);
      await sock.sendMessage(jid, { text: `🆔 ඔබගේ Session ID:\n\n${sessionString}` });
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.key.fromMe && m.type === 'notify') {
      await sock.readMessages([msg.key]);
      await sock.sendMessage(msg.key.remoteJid, { text: '👋 Hello DILSHAN MD BOT CONNECTED DONE✅.' });
    }
  });
}

startBot();
