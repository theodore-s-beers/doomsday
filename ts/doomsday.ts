//
// Pure functions
//

// Function to determine leap years
function leap(year: number): boolean {
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
function doomsday(year: number): number {
  const shortYearStr = String(year).slice(-2);
  let shortYear = Number(shortYearStr);

  if (shortYear % 2 != 0) {
    shortYear += 11;
  }

  shortYear /= 2;

  if (shortYear % 2 != 0) {
    shortYear += 11;
  }

  shortYear = Math.abs((shortYear % 7) - 7);

  const centuryOffsets: Record<number, number> = {
    1800: 6,
    1900: 4,
    2000: 3,
    2100: 1,
  };
  const century = Math.floor(year / 100) * 100;
  shortYear += centuryOffsets[century] ?? 1;

  shortYear %= 7;

  return shortYear;
}

// Function to associate results with weekdays
function weekday(doomsdayNum: number): string {
  const weekdays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return weekdays[doomsdayNum % 7];
}

//
// Stateful stuff
//

// Get elements
const yearSelect = document.getElementById("yearSelect") as HTMLSelectElement;
const submitBtn = document.getElementById("submitButton") as HTMLButtonElement;
const yearReit = document.getElementById("yearReiteration") as HTMLSpanElement;
const leapDisplay = document.getElementById("leapDisplay") as HTMLSpanElement;
const doomDisplay = document.getElementById("doom-display") as HTMLSpanElement;
const janDate = document.getElementById("janDate") as HTMLSpanElement;
const febDate = document.getElementById("febDate") as HTMLSpanElement;

// Set select to current year on page load
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
yearSelect.value = String(currentYear);

// Primary, combined function
function doom() {
  const year = Number(yearSelect.value);
  const isLeap = leap(year);
  const doomsdayNum = doomsday(year);
  const doomsdayName = weekday(doomsdayNum);

  yearReit.innerHTML = yearSelect.value;
  leapDisplay.innerHTML = isLeap
    ? "<strong>is</strong>"
    : "is <strong>not</strong>";
  janDate.innerText = isLeap ? "4" : "3";
  febDate.innerText = isLeap ? "29" : "28";

  doomDisplay.innerHTML = `<strong>${doomsdayName}</strong>`;

  yearSelect.blur();
}

// Run primary function on page load
doom();

//
// Event handling
//

// Function to run doom if Enter key is hit in select field
function submitOnEnter(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    doom();
  }
}

// Click and keydown event handlers
submitBtn.addEventListener("click", doom);
yearSelect.addEventListener("keydown", submitOnEnter);
