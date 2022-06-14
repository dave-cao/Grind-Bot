const { MessageEmbed } = require('discord.js');
const grindProfile = require('./handle-messages/grind-profile');
const User = require('./handle-user');

module.exports = class Message {
  constructor(message) {
    // =======================
    // GENERAL VARIABLES
    // =======================
    this.message = message;
    this.username = this.message.author.username;
    this.userid = this.message.author.id;

    // All Purpose
    this.now = new Date();

    // ====================
    // USER SPECIFIC
    // ====================
    this.User = new User(this.username, this.userid, this.now);
    this.user = this.User.initUser();
  }

  start() {
    this.handleMessages();
  }

  handleMessages() {
    switch (this.message.content.toLowerCase()) {
      // Grind profile display
      case 'grind profile':
        this.message.reply({
          embeds: [grindProfile(this.user, this.User.getArrayOfUsers())],
        });
        break;

      case 'test':
        console.log(this.message);
        break;
    }
  }
};
