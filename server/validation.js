const { ObjectId } = require("mongodb");
const { isValidStateInput } = require("usa-state-validator");

function validObjectID(id) {
  if (!id) throw "ERROR: ID IS REQUIRED";
  if (typeof id !== "string") throw "ERROR: ID MUST BE A STRING";
  if (id.trim().length === 0) throw "ERROR: ID CAN'T BE EMPTY STRING";

  return ObjectId.isValid(id.trim());
}

function validString(str) {
  if (!str) throw "ERROR: STRING IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: STRING MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: STRING CAN'T BE EMPTY STRING";

  return str.trim();
}

function validSiteName(str) {
  // first letter of each word must be capitol letter

  if (!str) throw "ERROR: SITE NAME IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: SITE NAME MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: SITE NAME CAN'T BE EMPTY STRING";

  const words = str.trim().split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i].length === 0) throw "ERROR: SITE NAME CAN'T HAVE EMPTY WORDS";
    if (words[i][0] !== words[i][0].toUpperCase())
      throw "ERROR: SITE NAME MUST HAVE CAPITALIZED WORDS";
  }

  return str.trim();
}

function validSiteDescription(arr) {
  // capitolize first letter of each sentence

  if (!arr) throw "ERROR: SITE DESCRIPTION IS REQUIRED";
  if (!Array.isArray(arr)) throw "ERROR: SITE DESCRIPTION MUST BE AN ARRAY";
  if (arr.length === 0) throw "ERROR: SITE DESCRIPTION CAN'T BE EMPTY ARRAY";

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string")
      throw "ERROR: SITE DESCRIPTION MUST BE AN ARRAY OF STRINGS";
    if (arr[i].trim().length === 0)
      throw "ERROR: SITE DESCRIPTION CAN'T HAVE EMPTY STRINGS";
    if (arr[i][0] !== arr[i][0].toUpperCase())
      arr[i][0] = arr[i][0].toUpperCase();
  }

  return arr;
}

function validBorough(str) {
  if (!str) throw "ERROR: BOROUGH IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: BOROUGH MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: BOROUGH CAN'T BE EMPTY STRING";

  const boroughs = [
    "Manhattan",
    "Brooklyn",
    "Queens",
    "Bronx",
    "Staten Island",
  ];

  if (!boroughs.includes(str.trim()))
    throw "ERROR: BOROUGH MUST BE ONE OF THE FOLLOWING: Manhattan, Brooklyn, Queens, Bronx, Staten Island";

  return str.trim();
}

function validHours(str) {
  if (!str) throw "ERROR: HOURS IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: HOURS MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: HOURS CAN'T BE EMPTY STRING";

  // time can be either 9PM or 9:30PM or 11:30AM or 11AM

  const hours = str.trim().split("-");
  if (hours.length !== 2)
    throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM";

  const start = hours[0].trim();
  const end = hours[1].trim();

  let splitStart = start.split(":");
  let splitEnd = end.split(":");

  if (splitStart.length == 2) {
    if (splitStart[0].length !== 2 || splitStart[1].length !== 4)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      isNaN(parseInt(splitStart[0])) ||
      isNaN(parseInt(splitStart[1].substring(0, 2)))
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      splitStart[1].substring(2, 4) !== "AM" &&
      splitStart[1].substring(2, 4) !== "PM"
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (parseInt(splitStart[0]) > 12 || parseInt(splitStart[0]) < 1)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (parseInt(splitStart[1].substring(0, 2)) > 59)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";
  } else {
    if (splitStart[0].length !== 4)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (isNaN(parseInt(splitStart[0].substring(0, 2))))
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      splitStart[0].substring(2, 4) !== "AM" &&
      splitStart[0].substring(2, 4) !== "PM"
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      parseInt(splitStart[0].substring(0, 2)) > 12 ||
      parseInt(splitStart[0].substring(0, 2)) < 1
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";
  }

  if (splitEnd.length == 2) {
    if (splitEnd[0].length !== 2 || splitEnd[1].length !== 4)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      isNaN(parseInt(splitEnd[0])) ||
      isNaN(parseInt(splitEnd[1].substring(0, 2)))
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      splitEnd[1].substring(2, 4) !== "AM" &&
      splitEnd[1].substring(2, 4) !== "PM"
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (parseInt(splitEnd[0]) > 12 || parseInt(splitEnd[0]) < 1)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (parseInt(splitEnd[1].substring(0, 2)) > 59)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";
  } else {
    if (splitEnd[0].length !== 4)
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (isNaN(parseInt(splitEnd[0].substring(0, 2))))
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      splitEnd[0].substring(2, 4) !== "AM" &&
      splitEnd[0].substring(2, 4) !== "PM"
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";

    if (
      parseInt(splitEnd[0].substring(0, 2)) > 12 ||
      parseInt(splitEnd[0].substring(0, 2)) < 1
    )
      throw "ERROR: HOURS MUST BE IN THE FOLLOWING FORMAT: 00:00AM-00:00PM or 00AM-00PM";
  }

  // make sure that the start time is before the end time

  if (splitStart.length == 2) {
    if (splitEnd.length == 2) {
      if (parseInt(splitStart[0]) > parseInt(splitEnd[0]))
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0]) === parseInt(splitEnd[0]) &&
        parseInt(splitStart[1].substring(0, 2)) >=
          parseInt(splitEnd[1].substring(0, 2))
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";
    } else {
      if (parseInt(splitStart[0]) > parseInt(splitEnd[0].substring(0, 2)))
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0]) === parseInt(splitEnd[0].substring(0, 2)) &&
        parseInt(splitStart[1].substring(0, 2)) >=
          parseInt(splitEnd[0].substring(2, 4))
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";
    }
  } else {
    if (splitEnd.length == 2) {
      if (parseInt(splitStart[0].substring(0, 2)) > parseInt(splitEnd[0]))
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0].substring(0, 2)) === parseInt(splitEnd[0]) &&
        parseInt(splitStart[0].substring(2, 4)) >=
          parseInt(splitEnd[1].substring(0, 2))
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";
    } else {
      if (
        parseInt(splitStart[0].substring(0, 2)) >
        parseInt(splitEnd[0].substring(0, 2))
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0].substring(0, 2)) ===
          parseInt(splitEnd[0].substring(0, 2)) &&
        parseInt(splitStart[0].substring(2, 4)) >=
          parseInt(splitEnd[0].substring(2, 4))
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";
    }
  }

  return str.trim();
}

function validState(str) {
  if (!str) throw "ERROR: STATE IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: STATE MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: STATE CAN'T BE EMPTY STRING";

  if (!isValidStateInput(str.trim()))
    throw "ERROR: STATE MUST BE A VALID STATE";

  if (str.trim().length > 2)
    throw "ERROR: STATE MUST BE A VALID STATE ABBREVIATION";

  return str.trim();
}

function validZipcode(str) {
  if (!str) throw "ERROR: ZIPCODE IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: ZIPCODE MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: ZIPCODE CAN'T BE EMPTY STRING";

  if (str.trim().length !== 5) throw "ERROR: ZIPCODE MUST BE 5 DIGITS";

  if (isNaN(str.trim())) throw "ERROR: ZIPCODE MUST BE 5 DIGITS";

  return str.trim();
}

function validDays(str) {
  if (!str) throw "ERROR: DAYS IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: DAYS MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: DAYS CAN'T BE EMPTY STRING";

  const days = str.trim().split("-");
  if (days.length !== 2) throw "ERROR: DAYS MUST BE IN THE FORMAT: Day1-Day2";

  if (days[0].length !== 3)
    throw "ERROR: DAYS MUST BE IN THE FORMAT: Day1-Day2";
  if (days[1].length !== 3)
    throw "ERROR: DAYS MUST BE IN THE FORMAT: Day1-Day2";

  const daysArr = [days[0], days[1]];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (!daysOfWeek.includes(daysArr[0]))
    throw "ERROR: DAYS MUST USE THE FOLLOWING: Mon, Tue, Wed, Thu, Fri, Sat, Sun";

  if (!daysOfWeek.includes(daysArr[1]))
    throw "ERROR: DAYS MUST USE THE FOLLOWING: Mon, Tue, Wed, Thu, Fri, Sat, Sun";

  if (daysOfWeek.indexOf(daysArr[0]) > daysOfWeek.indexOf(daysArr[1]))
    throw "ERROR: DAYS MUST FOLLOW ONE AFTER THE OTHER";

  return str.trim();
}

function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
}

function validWebsite(str) {
  if (!str) throw "ERROR: WEBSITE IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: WEBSITE MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: WEBSITE CAN'T BE EMPTY STRING";

  if (!isValidURL(str.trim())) throw "ERROR: WEBSITE MUST BE A VALID URL";

  return str.trim();
}

function validAge(str) {
  if (!str) throw "ERROR: AGE IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: AGE MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: AGE CAN'T BE EMPTY STRING";

  if (isNaN(parseInt(str.trim()))) throw "ERROR: AGE MUST BE A NUMBER";

  if (parseInt(str.trim()) < 0) throw "ERROR: AGE MUST BE A POSITIVE NUMBER";

  return str.trim();
}

module.exports = {
  validObjectID,
  validString,
  validSiteName,
  validSiteDescription,
  validBorough,
  validHours,
  validState,
  validZipcode,
  validDays,
  validWebsite,
  validAge,
};
