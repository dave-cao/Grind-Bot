// Get message class from message actions.js
const Message = require('../commands/message-actions');

module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message) {
    // Initalize message class
    const messageClass = new Message(message);
    messageClass.start();
  },
};
