// This script runs everything needed to handle the accountability of the grind bot
const self = require('../../self-functions');

function dateCheck(userData, dateChecks) {
  // User is an object containing the user data
  // dateCheck is an array of boolean values checking a time range
  // check[0] = contains the boolean values
  // check[1] = contains the names of the checks
  const user = userData;
  dateChecks.forEach((check) => {
    if (!check[0]) {
      user[`${check[1]}Date`] = new Date();
      user[`${check[1]}Time`] = 0;
    }
  });
  return user;
}

module.exports = (userData) => {
  // user is an object of the current user who has entered Grind Time
  let user = userData;

  // log user enter time
  user.enterTime = new Date();

  // Date Checks
  const isSameDay = self.isThisDay(new Date(user.dayDate));
  const isSameWeek = self.isThisWeek(new Date(user.weekDate));
  const isSameMonth = self.isThisMonth(new Date(user.monthDate));
  const isSameSeason = self.isThisSeason(new Date(user.seasonDate));

  // Array of date checks
  const dateChecks = [
    [isSameDay, 'day'],
    [isSameWeek, 'week'],
    [isSameMonth, 'month'],
    [isSameSeason, 'season'],
  ];

  user = dateCheck(user, dateChecks);

  return user;
};
