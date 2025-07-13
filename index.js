// 🔄 Keep-alive server for Render (prevents sleeping on Free plan)
const express = require('express');
const app = express();
app.get('/', (_, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Keep-alive server running on port 3000'));

// 🌐 Bedrock bot setup
process.env.DISABLE_NATIVE = "true";
const { createClient } = require('bedrock-protocol');
const walkLoop = require('./behaviors/walkLoop');

// 🛠 Create the Minecraft Bedrock bot
const bot = createClient({
  host: 'lootboxphh.aternos.me', // replace with your server
  port: 44399,
  username: 'Noxell',
  offline: true,
  version: '1.21.93'
});

bot.on('spawn', () => {
  console.log('Noxell joined the server!');
  walkLoop(bot); // start walking behavior loop
});
