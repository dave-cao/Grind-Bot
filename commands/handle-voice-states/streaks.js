const self = require('../../self-functions');

module.exports = (user, streakChannel, save) => {
  const now = new Date();
  const streakDate = new Date(user.streakDate);

  const timeDiff = now - streakDate;
  const daysBetween = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  const isSameDay = self.isThisDay(streakDate);

  setTimeout(() => {
    // async function can save user data because of
    // closure
    save(user);
  }, 5000);
};
