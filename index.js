const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// බොට් එක set කරනවා
const client = new Client({
  authStrategy: new LocalAuth()
});

// QR Code එකක් generate කරනවා
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('📱 WhatsApp එකෙන් QR කේතය scan කරන්න!');
});

// බොට් එක සූදානම් වෙද්දී
client.on('ready', () => {
  console.log('🤖 DILSHAN MDගේ WhatsApp බොට් එක සූදානම්!');
});

// Message එකක් ලැබුනොත්
client.on('message', message => {
  const text = message.body.toLowerCase(); // message එක lowercase කරන්න

  if (text === 'hi') {
    message.reply('හෙලෝ! මම DILSHAN MDගේ බොට් එක 😄');
  } else if (text === 'help') {
    message.reply('ඔයාට උදව් ඕනෙ නම්, මෙන්න command list එක:\n- hi\n- help\n- about');
  } else if (text === 'about') {
    message.reply('මම හදලා තියෙන්නෙ DILSHAN MD විසින්! 🚀');
  } else {
    message.reply('මට තේරෙන්නේ නෑ. "help" කියලා type කරන්න');
  }
});
