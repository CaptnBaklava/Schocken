module.exports = {
  // Discord bot token - get from environment variable
  token: process.env.DISCORD_TOKEN || '',
  
  // Bot settings
  prefix: '!',
  clientId: process.env.CLIENT_ID || '',
  guildId: process.env.GUILD_ID || '',
  
  // Game configuration
  diceGame: {
    initialDiceCount: 3,
    minDiceValue: 1,
    maxDiceValue: 6
  }
};
