# Deployment Guide for Discord Dice Bot

## Preparing for GitHub

1. Create a new GitHub repository
2. Initialize Git in this directory (if not already done):
   ```
   git init
   ```
3. Add your files to Git:
   ```
   git add .
   ```
4. Commit your changes:
   ```
   git commit -m "Initial commit"
   ```
5. Link your local repository to GitHub:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```
6. Push your code:
   ```
   git push -u origin main
   ```

## Manual package.json Modifications

Before pushing to GitHub, update your package.json to include the start script. Open package.json and modify the "scripts" section to include:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node index.js",
  "dev": "node index.js"
}
```

This modification is crucial for Render to recognize the `yarn start` command.

## Deploying to Render

1. Create a new account on Render (https://render.com) if you don't have one
2. Connect your GitHub account to Render
3. Select "New Web Service"
4. Choose your Discord bot repository
5. Configure the service:
   - Name: discord-dice-bot (or your preferred name)
   - Environment: Node
   - Build Command: `yarn install` or `npm install`
   - Start Command: `yarn start` or `npm start`
   - Instance Type: Free (or paid if needed)

6. Add Environment Variables:
   - DISCORD_TOKEN: Your Discord bot token
   - CLIENT_ID: Your Discord application client ID

7. Deploy the service

## Keeping Your Bot Online

The included keep-alive server will help maintain uptime on the free tier of Render. The server listens on the PORT environment variable (which Render sets automatically) or defaults to port 3000.

## Troubleshooting

If your bot doesn't start on Render:
1. Check the logs in the Render dashboard
2. Verify your environment variables are set correctly
3. Make sure your package.json has the correct start script
4. Confirm that the bot works locally before deploying