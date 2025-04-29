const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const fs = require('fs');

// Logging setup
const logger = pino({ level: 'info' });

const app = express();

// Bot's configuration
const SESSION_ID = '{
  "creds": {
    "noiseKey": {
      "private": {
        "type": "Buffer",
        "data": [
          112,
          186,
          213,
          10,
          60,
          43,
          173,
          125,
          220,
          129,
          216,
          114,
          147,
          60,
          5,
          211,
          69,
          58,
          238,
          49,
          93,
          130,
          215,
          91,
          17,
          247,
          105,
          35,
          250,
          97,
          92,
          92
        ]
      },
      "public": {
        "type": "Buffer",
        "data": [
          125,
          137,
          71,
          98,
          21,
          140,
          222,
          249,
          61,
          63,
          9,
          156,
          120,
          36,
          101,
          241,
          25,
          231,
          141,
          71,
          78,
          205,
          133,
          99,
          190,
          24,
          56,
          66,
          19,
          99,
          17,
          29
        ]
      }
    },
    "pairingEphemeralKeyPair": {
      "private": {
        "type": "Buffer",
        "data": [
          184,
          163,
          52,
          116,
          182,
          48,
          247,
          176,
          150,
          8,
          4,
          132,
          169,
          35,
          212,
          42,
          31,
          231,
          192,
          73,
          139,
          190,
          225,
          75,
          10,
          75,
          87,
          112,
          130,
          233,
          94,
          113
        ]
      },
      "public": {
        "type": "Buffer",
        "data": [
          171,
          150,
          240,
          252,
          203,
          182,
          232,
          179,
          95,
          106,
          239,
          253,
          41,
          49,
          142,
          247,
          217,
          158,
          175,
          248,
          27,
          197,
          235,
          86,
          112,
          125,
          212,
          98,
          173,
          245,
          242,
          45
        ]
      }
    },
    "signedIdentityKey": {
      "private": {
        "type": "Buffer",
        "data": [
          24,
          201,
          231,
          251,
          70,
          24,
          28,
          13,
          243,
          3,
          160,
          36,
          139,
          128,
          161,
          168,
          162,
          223,
          45,
          215,
          248,
          244,
          249,
          180,
          72,
          147,
          209,
          151,
          56,
          110,
          217,
          70
        ]
      },
      "public": {
        "type": "Buffer",
        "data": [
          13,
          215,
          23,
          49,
          175,
          21,
          234,
          91,
          247,
          63,
          165,
          184,
          142,
          216,
          96,
          57,
          4,
          15,
          181,
          226,
          61,
          178,
          34,
          156,
          100,
          101,
          61,
          185,
          240,
          58,
          222,
          47
        ]
      }
    },
    "signedPreKey": {
      "keyPair": {
        "private": {
          "type": "Buffer",
          "data": [
            56,
            99,
            16,
            145,
            19,
            208,
            136,
            119,
            176,
            230,
            173,
            209,
            56,
            255,
            149,
            34,
            34,
            172,
            158,
            94,
            148,
            59,
            61,
            253,
            153,
            27,
            211,
            95,
            49,
            194,
            210,
            94
          ]
        },
        "public": {
          "type": "Buffer",
          "data": [
            244,
            32,
            156,
            139,
            63,
            121,
            63,
            230,
            22,
            61,
            65,
            55,
            49,
            67,
            63,
            55,
            83,
            78,
            207,
            186,
            75,
            104,
            97,
            52,
            129,
            236,
            131,
            228,
            35,
            111,
            102,
            14
          ]
        }
      },
      "signature": {
        "type": "Buffer",
        "data": [
          148,
          179,
          236,
          96,
          235,
          154,
          96,
          236,
          64,
          135,
          129,
          252,
          29,
          218,
          197,
          129,
          241,
          212,
          189,
          246,
          147,
          229,
          24,
          100,
          120,
          65,
          182,
          222,
          68,
          98,
          186,
          95,
          198,
          87,
          45,
          146,
          164,
          49,
          43,
          19,
          119,
          131,
          128,
          79,
          29,
          77,
          19,
          111,
          58,
          77,
          222,
          5,
          208,
          143,
          84,
          247,
          197,
          177,
          236,
          11,
          252,
          101,
          140,
          132
        ]
      },
      "keyId": 1
    },
    "registrationId": 16,
    "advSecretKey": "OMjlXXAbAilcDamPF9zfsUXc2ymZ9bBY1rJhXaZHWBc=",
    "processedHistoryMessages": [],
    "nextPreKeyId": 31,
    "firstUnuploadedPreKeyId": 31,
    "accountSyncCounter": 0,
    "accountSettings": {
      "unarchiveChats": false
    },
    "registered": false,
    "account": {
      "details": "CJz7t5AEEOyKwsAGGAsgACgA",
      "accountSignatureKey": "76h1hYaQ3Vi9fvvppDmW56Cf2hJc6KneNjslBA+VH2c=",
      "accountSignature": "SE2uUzbmRlS/KqXSAqL1OU6BX9ovwRqYWESB1BifEtN2hsbKx6fmW4DUMeUJAdb2Q43HdmJ/+FrIviX82bdfAg==",
      "deviceSignature": "PCINM2I63JS+PCf2cCK44oluuGEmqC7SLpbb7DgoqDdy8O+diUI1rsqPCkhZX/FeoJbovox6OlVmNPGu1V71jw=="
    },
    "me": {
      "id": "94772194789:46@s.whatsapp.net",
      "lid": "234480015044700:46@lid"
    },
    "signalIdentities": [
      {
        "identifier": {
          "name": "94772194789:46@s.whatsapp.net",
          "deviceId": 0
        },
        "identifierKey": {
          "type": "Buffer",
          "data": [
            5,
            239,
            168,
            117,
            133,
            134,
            144,
            221,
            88,
            189,
            126,
            251,
            233,
            164,
            57,
            150,
            231,
            160,
            159,
            218,
            18,
            92,
            232,
            169,
            222,
            54,
            59,
            37,
            4,
            15,
            149,
            31,
            103
          ]
        }
      }
    ],
    "platform": "android",
    "routingInfo": {
      "type": "Buffer",
      "data": [
        8,
        5,
        8,
        13
      ]
    },
    "lastAccountSyncTimestamp": 1745913200,
    "lastPropHash": "PWk5B"
  },
  "keys": {}
}';  // ඔබගේ session ID එක මෙහි දාන්න
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
