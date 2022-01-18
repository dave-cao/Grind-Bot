const self = require('../../self-functions');

module.exports = (userInfo, streakChannel, save) => {
  // user is an object containing the user info
  // streakChannel is a string Id of the streak channel
  // save is a function that saves user data;
  const user = userInfo;
  const now = new Date();
  const streakDate = new Date(user.streakDate);

  const timeDiff = now - streakDate;
  // TODO: if daysbetween is used more than once, put into self-functions
  const daysBetween = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const isSameDay = self.isThisDay(streakDate);

  const oneDayMill = 24 * 60 * 60 * 1000;
  const yesterday = now - oneDayMill;

  if (!isSameDay || user.firstStreak) {
    // ============================
    // STREAK FREEZE IMPLEMENTATION
    // ============================
    if (daysBetween > 1) {
      for (let i = daysBetween; i > 1; i -= 1) {
        user.streakFreeze -= 1;
      }
    }
    if (user.streakFreeze >= 0) {
      streakChannel.send(
        `<@${user.ID}> You were about to lose your streak but your freeze saved the day!\nYou now have \`${user.streakFreeze}\` freeze(s) left!`,
      );
      // if user enters but doesn't make new streak, don't take all streaks freezes again.
      user.streakDate = new Date(yesterday);
    }
  }

  setTimeout(() => {
    // async function can save user data because of
    // closure
    save(user);
  }, 5000);

  return user;
};
