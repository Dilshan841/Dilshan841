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
