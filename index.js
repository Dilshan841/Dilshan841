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
      await sock.sendMessage(msg.key.remoteJid, { text: `👋 හෙලෝ! මම ${BOT_NAME} 😎` });
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
