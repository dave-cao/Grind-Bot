// Get voice class from voice actions.js
const Voice = require('../commands/voice-actions.js');

module.exports = {
  name: 'voiceStateUpdate',
  once: false,
  execute(oldState, newState) {
    // Initalize voice class
    const voice = new Voice(oldState, newState);
    voice.test();
  },
};
