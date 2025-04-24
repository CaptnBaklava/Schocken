const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Initialize client with required intents
// Only using Guilds intent since we're just using slash commands and buttons
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// Commands collection
client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  
  // Set command in collection
  client.commands.set(command.data.name, command);
  console.log(`Loaded command: ${command.data.name}`);
}

// Load event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  console.log(`Loaded event: ${event.name}`);
}

// Handle errors
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(config.token)
  .then(() => console.log('Discord bot logged in successfully'))
  .catch(error => {
    console.error('Failed to log in to Discord:', error);
    process.exit(1);
  });

// Keep the app running
process.on('SIGINT', () => {
  console.log('Bot is shutting down...');
  client.destroy();
  process.exit(0);
});
