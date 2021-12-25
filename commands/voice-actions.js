// calls User class
const User = require('./handle-voice-states/handle-user-voice.js'); // Class

// Functions
const accountabilityEnter = require('./handle-voice-states/accountability-enter.js');

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
    this.newChannelID = newState.channelId;
    this.oldChannelID = oldState.channelId;
    this.grindChannelVC = '921966065108521005';
    this.streakChannel = newState.guild.channels.cache.get('921966065108521004');
    this.accountabilityChannel = newState.guild.channels.cache.get('921966065108521004');

    // All purpose
    this.now = new Date();
    this.minute = 1000 * 60;
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
    // Put outside if implementing more things, for now just call twice
    this.User.saveUserData(this.user);
  }

  handleEvents() {
    // User actions
    const userEnters = this.newChannelID === this.grindChannelVC
      && this.oldChannelID !== this.grindChannelVC;
    const userExits = this.newChannelID !== this.grindChannelVC
      && this.oldChannelID === this.grindChannelVC;

    // User enters
    if (userEnters) {
      this.handleUserEnter();
      this.saveUserData();
    }
    // User Exits
    if (userExits) {
      this.handleUserExit();
      this.saveUserData();
    }
  }

  handleUserEnter() {
    // General Updates
    this.user.inVoiceChannel = true;

    // Accountability
    this.user = accountabilityEnter(this.user);
  }

  handleUserExit() {
    // General Updates
    this.user.inVoiceChannel = false;

    // Accountability
    // TODO: Make a handle user exit js file
    // Accountability exit
  }

  start() {
    this.handleEvents();
  }
};
