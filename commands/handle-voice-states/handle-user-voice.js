const fs = require('fs');

module.exports = class User {
  // Handles all user read and write
  constructor(username, userID, nowDate) {
    // General Variables
    this.username = username;
    this.userID = userID;
    this.now = nowDate;
    this.filename = 'userData.json';

    this.templateData = {
      // User Specific
      username: this.username,
      userID: this.userID,
      inVoiceChannel: true,

      // Streak Data
      streakDate: this.now,
      streak: 0,
      maxStreak: 0,
      streakFreeze: 0,
      firstStreak: true,

      // Accountability
      enterTime: this.now,
      dayDate: this.now,
      weekDate: this.now,
      monthDate: this.now,
      dayTime: 0,
      weekTime: 0,
      monthTime: 0,
      totalTime: 0,
    };

    // Get array of users from JSON file
    this.arrayOfUsers = this.getArrayOfUsers();

    // Get the user who entered
    this.user = this.initUser();
  }

  getArrayOfUsers() {
    // Grabs user data from a file
    // If no file is found, then return empty array
    if (fs.existsSync(this.filename)) {
      const jsonString = fs.readFileSync(this.filename, 'utf8');
      const userData = JSON.parse(jsonString);
      return userData;
    }
    return [];
  }

  initUser() {
    // arrayOfUsers is an array of user objects from a JSON file
    // Initialize the user - meaning allow class usage of user
    const user = this.arrayOfUsers.filter(
      (userDatum) => userDatum.userID === this.userID,
    );

    // Destructure user (user = user[0]). This is because user is an array
    // With one item
    let [userData] = user;
    const userExists = user.length > 0;
    if (!userExists) {
      userData = this.templateData;
    }
    return userData;
  }

  saveUserData(newUser) {
    // Save user data to json file while changing user specific data in the
    // User array
    let userExists = false;
    this.arrayOfUsers.forEach((oldUser, index) => {
      if (oldUser.userID === newUser.userID) {
        this[index] = newUser;
        userExists = true;
      }
    }, this.arrayOfUsers);

    // If user doesn't exist, then push information
    if (!userExists) {
      this.arrayOfUsers.push(newUser);
    }

    // Save data
    const finished = (error) => {
      if (error) {
        console.log(error);
      }
    };
    const jsonData = JSON.stringify(this.arrayOfUsers, null, 2);
    fs.writeFileSync(this.filename, jsonData, finished);
  }
};
