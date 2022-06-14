const { MessageEmbed } = require('discord.js');
const self = require('../../self-functions');

const exampleEmbed = new MessageEmbed()
  .setColor('#0099ff')
  .setTitle('some title')
  .setDescription('hello this is description');

function dateCheck(userData, dateChecks) {
  // User is an object of user data
  // Date checks are true or false depending on date
  // We will alter user data and save depending ??
  const user = userData;
  dateChecks.forEach((check) => {
    // perhaps this might be out of scope
    if (check[0]) {
      const string = `${check[1]}Ranks`;
      string.push(user);
    }
  });
}

module.exports = (user, allUserData) => {
  const now = new Date();
  // Array or Ranks
  const dayRanks = [];
  const weekRanks = [];
  const monthRanks = [];
  const seasonRanks = [];
  const totalRanks = [];

  // TODO:
  // 1. If user hasn't grinded today then not in rankings
  allUserData.forEach((userData) => {
    const isSameDay = self.isthisDay(new Date(userData.dayDate));
    if (isSameDay) {
      dayRanks.push(userData);
    }
  });

  // 2. If user hasn't grinded this week then not in rankings
  // 3. If user hasn't grinded this month then not in rankings
  // 4. If user hasn't grinded this season then not in rankings
  // 5. Push total time grinded
  // ========== perhaps you can make a loop here? ===============

  // 1. Implement time left till streak ends
  // 2. Tells user hos much time they have left on streak
  // 3. If user is gone for a long time and pulls up profil, current streak
  //  will display ??

  return exampleEmbed;
};
