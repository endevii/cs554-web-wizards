const { ObjectId } = require("mongodb");
const { isValidStateInput } = require("usa-state-validator");

function validObjectID(id) {
  if (!id) throw "ERROR: ID IS REQUIRED";
  if (typeof id !== "string") throw "ERROR: ID MUST BE A STRING";
  if (id.trim().length === 0) throw "ERROR: ID CAN'T BE EMPTY STRING";
  if (!ObjectId.isValid(id.trim())) throw "ERROR: ID IS NOT VALID";

  return id.trim();
}

function validString(str, type) {
  console.log(`validating ${str} of type ${type}...`);
  if (!str) throw `ERROR: STRING '${type}' IS REQUIRED`;
  if (typeof str !== "string") throw `ERROR: STRING '${type}' MUST BE A STRING`;
  if (str.trim().length === 0) throw `ERROR: STRING '${type}' CAN'T BE EMPTY`;

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
    // if (words[i][0] !== words[i][0].toUpperCase())
    //   words[i] = words[i][0].toUpperCase() + words[i].slice(1);
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
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      isNaN(parseInt(splitStart[0])) ||
      isNaN(parseInt(splitStart[1].substring(0, 2)))
    )
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      splitStart[1].substring(2, 4) !== "AM" &&
      splitStart[1].substring(2, 4) !== "PM"
    )
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (parseInt(splitStart[0]) > 12 || parseInt(splitStart[0]) < 1)
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (parseInt(splitStart[1].substring(0, 2)) > 59)
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";
  } else {
    if (splitStart[0].length !== 4)
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (isNaN(parseInt(splitStart[0].substring(0, 2))))
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      splitStart[0].substring(2, 4) !== "AM" &&
      splitStart[0].substring(2, 4) !== "PM"
    )
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      parseInt(splitStart[0].substring(0, 2)) > 12 ||
      parseInt(splitStart[0].substring(0, 2)) < 1
    )
      throw "ERROR: START MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";
  }

  if (splitEnd.length == 2) {
    if (splitEnd[0].length !== 2 || splitEnd[1].length !== 4)
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      isNaN(parseInt(splitEnd[0])) ||
      isNaN(parseInt(splitEnd[1].substring(0, 2)))
    )
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      splitEnd[1].substring(2, 4) !== "AM" &&
      splitEnd[1].substring(2, 4) !== "PM"
    )
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (parseInt(splitEnd[0]) > 12 || parseInt(splitEnd[0]) < 1)
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (parseInt(splitEnd[1].substring(0, 2)) > 59)
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";
  } else {
    if (splitEnd[0].length !== 4)
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (isNaN(parseInt(splitEnd[0].substring(0, 2))))
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      splitEnd[0].substring(2, 4) !== "AM" &&
      splitEnd[0].substring(2, 4) !== "PM"
    )
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";

    if (
      parseInt(splitEnd[0].substring(0, 2)) > 12 ||
      parseInt(splitEnd[0].substring(0, 2)) < 1
    )
      throw "ERROR: END MUST BE IN THE FOLLOWING FORMAT: 00:00AM/PM 00AM/PM";
  }

  // make sure that the start time is before the end time

  if (splitStart.length == 2) {
    if (splitEnd.length == 2) {
      if (
        parseInt(splitStart[0]) > parseInt(splitEnd[0]) &&
        splitStart[1][2] === splitEnd[1][2]
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0]) === parseInt(splitEnd[0]) &&
        parseInt(splitStart[1].substring(0, 2)) >=
          parseInt(splitEnd[1].substring(0, 2)) &&
        splitStart[1][2] === splitEnd[1][2]
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";
    } else {
      if (
        parseInt(splitStart[0]) > parseInt(splitEnd[0].substring(0, 2)) &&
        splitStart[1][2] === splitEnd[0][2]
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0]) === parseInt(splitEnd[0].substring(0, 2)) &&
        parseInt(splitStart[1].substring(0, 2)) >=
          parseInt(splitEnd[0].substring(2, 4)) &&
        splitStart[1][2] === splitEnd[0][2]
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";
    }
  } else {
    if (splitEnd.length == 2) {
      if (
        parseInt(splitStart[0].substring(0, 2)) > parseInt(splitEnd[0]) &&
        splitStart[0][2] === splitEnd[1][2]
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0].substring(0, 2)) === parseInt(splitEnd[0]) &&
        parseInt(splitStart[0].substring(2, 4)) >=
          parseInt(splitEnd[1].substring(0, 2)) &&
        splitStart[0][2] === splitEnd[1][2]
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";
    } else {
      if (
        parseInt(splitStart[0].substring(0, 2)) >
          parseInt(splitEnd[0].substring(0, 2)) &&
        splitStart[0][2] === splitEnd[0][2]
      )
        throw "ERROR: START TIME MUST BE BEFORE END TIME";

      if (
        parseInt(splitStart[0].substring(0, 2)) ===
          parseInt(splitEnd[0].substring(0, 2)) &&
        parseInt(splitStart[0].substring(2, 4)) >=
          parseInt(splitEnd[0].substring(2, 4)) &&
        splitStart[0][2] === splitEnd[0][2]
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

function validRating(str) {
  if (!str) throw "ERROR: RATING IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: RATING MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: RATING CAN'T BE EMPTY STRING";

  if (isNaN(parseInt(str.trim()))) throw "ERROR: RATING MUST BE A NUMBER";

  if (parseInt(str.trim()) < 0) throw "ERROR: RATING MUST BE A POSITIVE NUMBER";

  if (parseInt(str.trim()) > 5)
    throw "ERROR: RATING MUST BE A NUMBER BETWEEN 0 AND 5";

  return str.trim();
}

function validTitle(str) {
  if (!str) throw "ERROR: TITLE IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: TITLE MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: TITLE CAN'T BE EMPTY STRING";
  str = str.trim();
  if (str.length > 100) throw "ERROR: TITLE MUST BE LESS THAN 100 CHARACTERS";

  if (str[0] !== str[0].toUpperCase()) {
    str[0] = str[0].toUpperCase();
  }

  return str;
}

function validCoordinates(arr) {
  if (!arr) throw "ERROR: COORDINATES IS REQUIRED";
  if (!Array.isArray(arr)) throw "ERROR: COORDINATES MUST BE AN ARRAY";
  if (arr.length !== 2) throw "ERROR: COORDINATES MUST BE AN ARRAY OF LENGTH 2";
  if (isNaN(arr[0]) || isNaN(arr[1]))
    throw "ERROR: COORDINATES MUST BE NUMBERS";
  if (arr[0] < -90 || arr[0] > 90)
    throw "ERROR: COORDINATES MUST BE BETWEEN -90 AND 90";
  if (arr[1] < -180 || arr[1] > 180)
    throw "ERROR: COORDINATES MUST BE BETWEEN -180 AND 180";

  return arr;
}

function validImage(str) {
  if (!str) throw "ERROR: IMAGE IS REQUIRED";
  if (typeof str !== "string") throw "ERROR: IMAGE MUST BE A STRING";
  if (str.trim().length === 0) throw "ERROR: IMAGE CAN'T BE EMPTY STRING";

  if (!isValidURL(str.trim())) throw "ERROR: IMAGE MUST BE A VALID URL";

  return str.trim();
}

function validSite(site) {
  if (!site) throw "ERROR: SITE IS REQUIRED";
  let errors = [];

  try {
    site.name = validSiteName(site.name);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.description = validSiteDescription(site.description);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.location.address = validString(site.location.address, "ADDRESS");
  } catch (e) {
    errors.push(e);
  }

  try {
    site.location.city = validString(site.location.city, "CITY");
  } catch (e) {
    errors.push(e);
  }

  try {
    site.location.state = validState(site.location.state);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.location.zipCode = validZipcode(site.location.zipCode);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.location.coordinates = validCoordinates(site.location.coordinates);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.hours.days = validDays(site.hours.days);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.hours.time = validHours(site.hours.time);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.website = validWebsite(site.website);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.category = validString(site.category, "CATEGORY");
  } catch (e) {
    errors.push(e);
  }

  try {
    site.borough = validBorough(site.borough);
  } catch (e) {
    errors.push(e);
  }

  try {
    site.founded = validAge(site.founded.toString());
  } catch (e) {
    errors.push(e);
  }

  try {
    site.image = validImage(site.image);
  } catch (e) {
    errors.push(e);
  }

  if (errors.length > 0) throw errors;

  return site;
}

function siteChanges(newSite, updatedSite) {
  if (!site) throw "ERROR: SITE IS REQUIRED";
  if (!changes) throw "ERROR: CHANGES IS REQUIRED";

  let updatedSiteData = {};

  let updatedCount = 0;

  if (updatedSite.name) {
    if (updatedSite.name !== newSite.name) {
      updatedCount += 1;
    }
    updatedSiteData.name = validSiteName(updatedSite.name);
  } else {
    updatedSiteData.name = newSite.name;
  }

  if (updatedSite.description) {
    if (updatedSite.description !== newSite.description) {
      updatedCount += 1;
    }
    updatedSiteData.description = validSiteDescription(updatedSite.description);
  } else {
    updatedSiteData.description = newSite.description;
  }

  if (updatedSite.location) {
    if (updatedSite.location.address) {
      if (updatedSite.location.address !== newSite.location.address) {
        updatedCount += 1;
      }
      updatedSiteData["location.address"] = validString(
        updatedSite.location.addres,
        "ADDRESS"
      );
    } else {
      updatedSiteData["location.address"] = newSite.location.address;
    }

    if (updatedSite.location.city) {
      if (updatedSite.location.city !== newSite.location.city) {
        updatedCount += 1;
      }
      updatedSiteData["location.city"] = validString(
        updatedSite.location.city,
        "CITY"
      );
    } else {
      updatedSiteData["location.city"] = newSite.location.city;
    }

    if (updatedSite.location.state) {
      if (updatedSite.location.state !== newSite.location.state) {
        updatedCount += 1;
      }
      updatedSiteData["location.state"] = validState(
        updatedSite.location.state
      );
    } else {
      updatedSiteData["location.state"] = newSite.location.state;
    }

    if (updatedSite.location.zipCode) {
      if (updatedSite.location.zipCode !== newSite.location.zipCode) {
        updatedCount += 1;
      }
      updatedSiteData["location.zipCode"] = validZipcode(
        updatedSite.location.zipCode
      );
    } else {
      updatedSiteData["location.zipCode"] = newSite.location.zipCode;
    }
  } else {
    updatedSiteData.location = newSite.location;
  }

  if (updatedSite.hours) {
    if (updatedSite.hours.day) {
      if (updatedSite.hours.day !== newSite.hours.day) {
        updatedCount += 1;
      }
      updatedSiteData["hours.day"] = validDays(updatedSite.hours.day);
    } else {
      updatedSiteData["hours.day"] = newSite.hours.day;
    }

    if (updatedSite.hours.time) {
      if (updatedSite.hours.time !== newSite.hours.time) {
        updatedCount += 1;
      }
      updatedSiteData["hours.time"] = validHours(updatedSite.hours.time);
    } else {
      updatedSiteData["hours.time"] = newSite.hours.time;
    }
  } else {
    updatedSiteData.hours = newSite.hours;
  }

  if (updatedSite.website) {
    if (updatedSite.website !== newSite.website) {
      updatedCount += 1;
    }
    updatedSiteData.website = validWebsite(updatedSite.website);
  } else {
    updatedSiteData.website = newSite.website;
  }

  if (updatedSite.category) {
    if (updatedSite.category !== newSite.category) {
      updatedCount += 1;
    }
    updatedSiteData.category = validString(updatedSite.category, "CATEGORY");
  } else {
    updatedSiteData.category = newSite.category;
  }

  if (updatedSite.borough) {
    if (updatedSite.borough !== newSite.borough) {
      updatedCount += 1;
    }
    updatedSiteData.borough = validBorough(updatedSite.borough);
  } else {
    updatedSiteData.borough = newSite.borough;
  }

  if (updatedSite.founded) {
    if (updatedSite.founded !== newSite.founded) {
      updatedCount += 1;
    }
    updatedSiteData.founded = validAge(updatedSite.founded.toString());
    updateSiteData.founded = parseInt(updatedSiteData.founded);
  } else {
    updatedSiteData.founded = newSite.founded;
  }

  if (updatedSite.image) {
    if (updatedSite.image !== newSite.image) {
      updatedCount += 1;
    }
    updatedSiteData.image = validImage(updatedSite.image);
  } else {
    updatedSiteData.image = newSite.image;
  }

  if (updatedCount === 0) throw "ERROR: NO UPDATES WERE MADE";

  return updatedSiteData;
}

function checkToBeUpdated(site) {
  if (!site) throw "ERROR: SITE IS REQUIRED";

  let updatedSiteData = {};

  if (site.name) {
    updatedSiteData.name = validSiteName(site.name);
  }

  if (site.description) {
    updatedSiteData.description = validSiteDescription(site.description);
  }

  if (site.location) {
    if (site.location.address) {
      updatedSiteData["location.address"] = validString(
        site.location.address,
        "ADDRESS"
      );
    }

    if (site.location.city) {
      updatedSiteData["location.city"] = validString(
        site.location.city,
        "CITY"
      );
    }

    if (site.location.state) {
      updatedSiteData["location.state"] = validState(site.location.state);
    }

    if (site.location.zipCode) {
      updatedSiteData["location.zipCode"] = validZipcode(site.location.zipCode);
    }
  }

  if (site.hours) {
    if (site.hours.day) {
      updatedSiteData["hours.day"] = validDays(site.hours.day);
    }

    if (site.hours.time) {
      updatedSiteData["hours.time"] = validHours(site.hours.time);
    }
  }

  if (site.website) {
    updatedSiteData.website = validWebsite(site.website);
  }

  if (site.category) {
    updatedSiteData.category = validString(site.category, "CATEGORY");
  }

  if (site.borough) {
    updatedSiteData.borough = validBorough(site.borough);
  }

  if (site.founded) {
    updatedSiteData.founded = validAge(site.founded.toString());
  }

  if (site.image) {
    updatedSiteData.image = validImage(site.image);
  }

  return updatedSiteData;
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
  validRating,
  validTitle,
  validCoordinates,
  validImage,
  validSite,
  siteChanges,
  checkToBeUpdated,
};
