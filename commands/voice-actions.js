const User = require('./handle-voice-states/handle-user-voice.js');

module.exports = class Action {
  constructor(oldState, newState) {
    // ===========================
    // GENERAL VARIABLES
    // ===========================
    // States
    this.oldState = oldState;
    this.newState = newState;
    this.person = newState.guild.client.users.cache.get(newState.id);

    // Channels
    this.newChannelID = newState.channelID;
    this.oldChannelID = oldState.channelID;
    this.grindChannelVC = '921966065108521005';
    this.streakChannel = newState.guild.channels.cache.get('921966065108521004');
    this.accountabilityChannel = newState.guild.channels.cache.get('921966065108521004');

    // All purpose
    this.now = new Date();
    const minute = 1000 * 60;
    this.filename = 'userData.json';

    // =============================
    // USER SPECIFIC
    // =============================
    // Initilize User
    this.User = new User(this.person.username, this.newState.id, this.now);
    this.user = this.User.initUser();
  }

  saveUserData() {
    // Save user data called from the User Class
    this.User.saveUserData(this.user);
  }

  test() {
    this.saveUserData();
  }
};
