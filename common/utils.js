// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Returns the name of the day with the given index. e.g. 0 returns PAZ.
export function getDayName(dayIndex) {
  return days[dayIndex];
}

//Returns the name of the month with the given index. e.g. 0 returns OCA.
export function getMontName(monthIndex) {
  return months[monthIndex];
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']