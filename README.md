# Discord Dice Bot

A Discord bot for interactive dice games, specifically designed for Schocken and other dice games.

## Features

- Roll command (`/roll`) to start a new dice game
- Interactive buttons to select/unselect dice
- "Reroll All" and "Roll Unselected" options 
- Triple detection (automatically ends the game when three of the same number are rolled)
- Public visibility of rolls to everyone in the server
- Maximum of 3 rolls per game
- Game state tracking with automatic cleanup
- Keep-alive mechanism to prevent bot downtime

## Setup

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in your Discord token and client ID
3. Install dependencies with `yarn install` or `npm install`
4. Start the bot with `yarn start` or `npm start`

## Hosting on Render

This project is configured for easy deployment on Render:

1. Push your code to GitHub
2. Create a new Web Service on Render and connect your repository
3. Set the environment variables for `DISCORD_TOKEN` and `CLIENT_ID`
4. Render will automatically use the `yarn start` command

## Commands

- `/roll`: Starts a new dice game with three dice
- Click on dice to select/unselect them (selected dice turn green)
- Use "Reroll All" to reroll all dice
- Use "Roll Unselected" to only reroll dice that aren't selected

## Development

- Built with discord.js v14
- Uses Express for keep-alive functionality
- Modular command and event structure

## License

MIT