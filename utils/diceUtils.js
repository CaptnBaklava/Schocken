const { ButtonBuilder, ButtonStyle } = require('discord.js');

/**
 * Creates a button representing a die with its value
 * @param {number} value - The value of the die (1-6)
 * @param {number} index - The index of the die (0-2)
 * @param {boolean} isKept - Whether the die is kept or not
 * @returns {ButtonBuilder} - The button representing the die
 */
function createDiceButtons(value, index, isKept = false) {
  // Convert die value to emoji representation
  const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  const emoji = diceEmojis[value - 1];

  return new ButtonBuilder()
    .setCustomId(`die${index}`)
    .setLabel(`${value} ${emoji}`)
    .setStyle(isKept ? ButtonStyle.Success : ButtonStyle.Primary)
    // Not disabling kept dice anymore so they can be unmarked
    .setDisabled(false);
}

/**
 * Creates a reroll all button
 * @returns {ButtonBuilder} - Button for rerolling all dice
 */
function createRerollAllButton() {
  return new ButtonBuilder()
    .setCustomId('rerollAll')
    .setLabel('🎲 Reroll All')
    .setStyle(ButtonStyle.Danger);
}

/**
 * Creates a button to reroll only unselected dice
 * @returns {ButtonBuilder} - Button for rerolling unselected dice
 */
function createRerollUnselectedButton() {
  return new ButtonBuilder()
    .setCustomId('rerollUnselected')
    .setLabel('🎲 Roll Unselected')
    .setStyle(ButtonStyle.Secondary);
}

/**
 * Roll dice
 * @param {number} count - Number of dice to roll
 * @param {number} min - Minimum die value
 * @param {number} max - Maximum die value
 * @returns {number[]} - Array of dice values
 */
function rollDice(count, min = 1, max = 6) {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Format dice values for display
 * @param {number[]} dice - Array of dice values
 * @returns {string} - Formatted string of dice values
 */
function formatDiceValues(dice) {
  const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return dice.map(value => `${value} ${diceEmojis[value - 1]}`).join(' | ');
}

/**
 * Check if all dice have the same value (triple)
 * @param {number[]} dice - Array of dice values 
 * @returns {boolean} - True if all dice have the same value
 */
function hasTriple(dice) {
  if (dice.length < 3) return false;
  return dice[0] === dice[1] && dice[1] === dice[2];
}

module.exports = {
  createDiceButtons,
  createRerollAllButton,
  createRerollUnselectedButton,
  rollDice,
  formatDiceValues,
  hasTriple
};
