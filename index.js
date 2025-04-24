const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const express = require('express');
const config = require('./config');

// Set up a simple Express server for Render
const app = express();
const PORT = process.env.PORT || 3000;

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

// Express routes
app.get('/', (req, res) => {
  res.send('Discord bot is running! 🤖');
});

app.get('/health', (req, res) => {
  res.status(200).send({
    status: 'UP',
    message: 'Bot is online and running'
  });
});

// Start the Express server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on port ${PORT}`);
});

// Keep-alive mechanism: ping self every 10 minutes to prevent Render shutdown
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

function pingServer() {
  const url = `${RENDER_URL}/health`;
  console.log(`Pinging self to stay alive: ${url}`);
  
  // Using standard Node.js http module to keep it simple
  require('http').get(url, (res) => {
    console.log(`Keep-alive ping successful with status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('Keep-alive ping failed:', err.message);
  });
}

// Start the keep-alive ping interval
if (process.env.NODE_ENV === 'production' || process.env.RENDER === 'true') {
  console.log('Starting keep-alive pinger every 10 minutes');
  setInterval(pingServer, PING_INTERVAL);
  
  // Do an initial ping on startup
  setTimeout(pingServer, 5000);
}
