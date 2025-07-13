process.env.DISABLE_NATIVE = "true";
const { createClient } = require('bedrock-protocol');

const bot = createClient({
  host: 'lootboxphh.aternos.me',
  port: 44399,
  username: 'Noxell',
  offline: true,
  version: '1.21.93'
});

bot.on('spawn', () => {
  console.log('✅ Noxell spawned on the server!');
});
