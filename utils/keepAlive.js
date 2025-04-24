const express = require('express');

// Create a simple Express server
function keepAlive() {
  const server = express();
  
  // Define a route to respond with a simple message
  server.get('/', (req, res) => {
    res.send('Discord Bot is alive!');
  });
  
  // Start the server on port 3000
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Keep-alive server running on port ${port}`);
  });
}

module.exports = keepAlive;