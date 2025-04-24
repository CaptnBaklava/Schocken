/**
 * State manager for dice games
 * Handles storing and retrieving game states
 */

// Map to store game states by message ID
const gameStates = new Map();

/**
 * Store a game state
 * @param {string} messageId - The message ID to use as a key
 * @param {Object} state - The game state to store
 */
function set(messageId, state) {
  gameStates.set(messageId, state);
  
  // Set a timeout to automatically clean up old game states after 10 minutes
  setTimeout(() => {
    if (gameStates.has(messageId)) {
      gameStates.delete(messageId);
      console.log(`Cleaned up stale game state for message: ${messageId}`);
    }
  }, 10 * 60 * 1000); // 10 minutes
}

/**
 * Get a game state
 * @param {string} messageId - The message ID to retrieve state for
 * @returns {Object|undefined} - The game state or undefined if not found
 */
function get(messageId) {
  return gameStates.get(messageId);
}

/**
 * Delete a game state
 * @param {string} messageId - The message ID to delete state for
 * @returns {boolean} - True if deleted, false if not found
 */
function remove(messageId) {
  return gameStates.delete(messageId);
}

/**
 * Check if a game state exists
 * @param {string} messageId - The message ID to check
 * @returns {boolean} - True if state exists, false otherwise
 */
function has(messageId) {
  return gameStates.has(messageId);
}

/**
 * Get the number of active game states
 * @returns {number} - The number of active game states
 */
function count() {
  return gameStates.size;
}

/**
 * Clear all game states
 */
function clear() {
  gameStates.clear();
}

module.exports = {
  set,
  get,
  remove,
  has,
  count,
  clear
};
