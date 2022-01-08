// Contains all the general-use functions that I make
// for the discord

module.exports = {
  now: new Date(),
  // TIME AND DATE FUNCTIONS
  isThisDay(date) {
    // Checks to see if a date is today or not.
    // Returns true if yes, returns false otherwise
    return this.now.toDateString() === date.toDateString();
  },

  isThisWeek(date) {
    // Checks to see if a date is within this week.
    const weekDay = (this.now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
    const monthDay = this.now.getDate();
    let mondayThisWeek = monthDay - weekDay;

    const startOfThisWeek = new Date(Number(this.now));
    startOfThisWeek.setDate(mondayThisWeek);
    startOfThisWeek.setHours(0, 0, 0, 0);
    mondayThisWeek = startOfThisWeek.getDate(); // take into account negative numbers

    const startOfNextWeek = new Date(Number(startOfThisWeek));
    startOfNextWeek.setDate(mondayThisWeek + 7);

    return date >= startOfThisWeek && date < startOfNextWeek;
  },

  isThisMonth(date) {
    // Checks to see if a date is within this month
    const currentMonth = this.now.getMonth();
    const currentYear = this.now.getFullYear();

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  },

  getTimeDifference(timeDiff) {
    // Returns an array of formatted hrs, mins and secs of a time difference
    // timeDiff is in milliseconds
    // [0]: the hours
    // [1]: the minutes
    // [2]: the secondt
    const hrs = Math.floor(timeDiff / (3600 * 1000));
    const min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return [hrs, min, sec];
  },
};
