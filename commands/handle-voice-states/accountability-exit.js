// A function script that handles the accountability
// events when someone leaves the voice channel
const self = require('../../self-functions');

module.exports = (userData, accountabilityChannel) => {
  // user is an object containing all the information
  // of a user that has connected to the discord
  const user = userData;

  // SESSION TRACKER
  const timeDif = new Date() - new Date(user.enterTime);
  const sessionTime = self.getTimeDifference(timeDif);

  // Add time difference to every time frame in user data
  const timeFrames = ['dayTime', 'weekTime', 'monthTime', 'totalTime'];
  timeFrames.forEach((time) => {
    user[time] += timeDif;
  });
  const dayTime = self.getTimeDifference(user.dayTime);

  // Report to User
  accountabilityChannel.send(
    `<@${user.userID}> You have grinded for \`${sessionTime[2]} hour(s), ${sessionTime[1]} minute(s) and ${sessionTime[0]} second(s)\` in **Grind Time**!\n\nThis comes to a total of \`${dayTime[2]} hour(s), ${dayTime[1]} minutes(s), and ${dayTime[0]} second(s)\` grinded **Today**!`,
  );

  return user;
};
