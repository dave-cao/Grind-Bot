// This script runs everything needed to handle the accountability of the grind bot

const now = new Date();

function isThisWeek(date) {
  // Checks to see if a date is within this week.
  const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
  const monthDay = now.getDate();
  const mondayThisWeek = monthDay - weekDay;

  const startOfThisWeek = new Date(Number(now));
  startOfThisWeek.setDate(mondayThisWeek);
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfNextWeek = new Date(Number(startOfThisWeek));
  startOfNextWeek.setDate(mondayThisWeek + 7);

  return date >= startOfThisWeek && date < startOfNextWeek;
}

function isThisMonth(date) {
  // Checks to see if a date is within this month
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
}

function dateCheck(userData, dateChecks) {
  // User is an object containing the user data
  // dateCheck is an array of boolean values checking a time range
  // check[0] = contains the boolean values
  // check[1] = contains the names of the checks
  const user = userData;
  dateChecks.forEach((check) => {
    if (!check[0]) {
      user[`${check[1]}Date`] = now;
      user[`${check[1]}Time`] = 0;
    }
  });
  return user;
}

module.exports = (userData) => {
  // user is an object of the current user who has entered Grind Time
  let user = userData;

  // log user enter time
  user.enterTime = now;

  // Date Checks
  const isSameDay = new Date(user.dayDate).toDateString() === now.toDateString();
  const isSameWeek = isThisWeek(new Date(user.weekDate));
  const isSameMonth = isThisMonth(new Date(user.monthDate));

  // Array of date checks
  const dateChecks = [
    [isSameDay, 'day'],
    [isSameWeek, 'week'],
    [isSameMonth, 'month'],
  ];

  user = dateCheck(user, dateChecks);

  return user;
};
