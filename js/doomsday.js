// Set select to current year
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const yearSelect = document.getElementById("yearSelect");
yearSelect.value = currentYear;

// Initialize a couple other variables
let year = 2020;
let doomsdayNumber = 0;

// Function to determine leap years
function leap() {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

// Function to calculate Doomsday
function doomsday() {
  let shortYear = year.toString().substr(-2);
  shortYear = parseInt(shortYear);
  if (shortYear % 2 != 0) {
    shortYear += 11;
  }
  shortYear /= 2;
  if (shortYear % 2 != 0) {
    shortYear += 11;
  }
  shortYear = Math.abs((shortYear % 7) - 7);
  if (1800 <= year && year < 1900) {
    shortYear += 6;
  } else if (1900 <= year && year < 2000) {
    shortYear += 4;
  } else if (2000 <= year && year < 2100) {
    shortYear += 3;
  } else {
    shortYear += 1;
  }
  shortYear = shortYear % 7;
  return shortYear;
}

// Function to associate results with weekdays
function weekday() {
  if (doomsdayNumber === 0) {
    return "Saturday";
  } else if (doomsdayNumber === 1) {
    return "Sunday";
  } else if (doomsdayNumber === 2) {
    return "Monday";
  } else if (doomsdayNumber === 3) {
    return "Tuesday";
  } else if (doomsdayNumber === 4) {
    return "Wednesday";
  } else if (doomsdayNumber === 5) {
    return "Thursday";
  } else {
    return "Friday";
  }
}

// Primary, combined function
function doom() {
  year = yearSelect.value;
  doomsdayNumber = doomsday();
  const isLeap = leap();
  const weekdayName = weekday();

  document.getElementById("yearReiteration").innerHTML = year;

  if (isLeap === true) {
    document.getElementById("leapDisplay").innerHTML = "<strong>is</strong>";
    document.getElementById("janDate").innerHTML = "4";
    document.getElementById("febDate").innerHTML = "29";
  } else {
    document.getElementById("leapDisplay").innerHTML =
      "is <strong>not</strong>";
    document.getElementById("janDate").innerHTML = "3";
    document.getElementById("febDate").innerHTML = "28";
  }

  document.getElementById("doomsdayDisplay").innerHTML =
    "<strong>" + weekdayName + "</strong>";

  yearSelect.blur();
}

// Run primary function on page load using current year
doom();

// Function to run doom if Enter key is pressed in select field
function submitOnEnter(event) {
  if (event.key === "Enter") {
    doom();
    event.preventDefault();
  }
}

// Click and keydown event handlers
document.getElementById("submitButton").addEventListener("click", doom);
document
  .getElementById("yearSelect")
  .addEventListener("keydown", submitOnEnter);
