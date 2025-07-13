const { createClient } = require('bedrock-protocol');
const express = require('express');
const fs = require('fs');

// Load behavior functions
const { handleNightSafety, handleHunger, handleMobAvoidance, handlePathing, respawnIfDead } = require('./behaviors');
const walkLoop = require('./behaviors/walkLoop');

// Create a basic Express server to keep the bot alive
const app = express();
app.get('/', (_, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Keep-alive server running on port 3000'));

// Create bot
const bot = createClient({
  host: 'lootboxphh.aternos.me',
  port: 44399,
  username: 'Noxell',
  offline: true,
  version: '1.21.93'
});

let isNight = false;

// Bot event handlers
bot.on('spawn', () => {
  console.log('Noxell joined the server!');
  console.log('Noxell spawned! Starting behaviors...');

  walkLoop(bot);
  handlePathing(bot);
});

bot.on('time', (packet) => {
  const time = packet.time;
  isNight = time > 13000;
});

bot.on('update_attributes', () => {
  handleHunger(bot);
});

bot.on('mob_spawn', () => {
  handleMobAvoidance(bot);
});

bot.on('death_info', () => {
  respawnIfDead(bot);
});

// Night safety check every 10 seconds
setInterval(() => {
  if (isNight) {
    handleNightSafety(bot);
  }
}, 10000);
