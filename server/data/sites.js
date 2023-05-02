const mongoCollections = require("../config/mongoCollections");
const sites = mongoCollections.sites;
const { ObjectId } = require("mongodb");
const helpers = require("../validation");

const createSite = async (
  name,
  description,
  location,
  hours,
  website,
  category,
  borough,
  age
) => {
  name = helpers.validSiteName(name);
  description = helpers.validSiteDescription(description);
  locName = helpers.validString(location.name);
  locAddress = helpers.validString(location.address);
  locCity = helpers.validString(location.city);
  locState = helpers.validState(location.state);
  locZip = helpers.validZipcode(location.zipCode);

  timeDay = helpers.validDays(hours.days);
  timeOpen = helpers.validHours(hours.time);

  website = helpers.validWebsite(website);

  category = helpers.validString(category);
  borough = helpers.validBorough(borough);
  age = helpers.validAge(age.toString());

  age = parseInt(age);
  const siteCollection = await sites();

  let newSite = {
    _id: new ObjectId().toString(),
    name: name,
    description: description,
    location: {
      name: locName,
      address: locAddress,
      city: locCity,
      state: locState,
      zipCode: locZip,
      coordinates: location.coordinates,
    },
    hours: {
      day: timeDay,
      time: timeOpen,
    },
    website: website,
    category: category,
    borough: borough,
    rating: 0,
    founded: age,
    reviews: [],
  };

  const insertInfo = await siteCollection.insertOne(newSite);
  if (insertInfo.insertedCount === 0) throw "ERROR: COULD NOT ADD SITE";

  const newId = insertInfo.insertedId;

  const site = await siteCollection.findOne({ _id: id });
  if (!site) throw "ERROR: COULD NOT FIND SITE";

  site._id = site._id.toString();

  return site;
};

const getAllSites = async () => {
  const siteCollection = await sites();

  const siteList = await siteCollection.find({}).toArray();

  for (let i = 0; i < siteList.length; i++) {
    siteList[i]._id = siteList[i]._id.toString();
  }

  return siteList;
};

const getSiteById = async (id) => {
  if (!id) throw "ERROR: ID IS REQUIRED";

  if (typeof id !== "string") throw "ERROR: ID MUST BE A STRING";

  if (id.trim().length === 0) throw "ERROR: ID CAN'T BE EMPTY STRING";

  id = helpers.validObjectID(id);

  if (!ObjectId.isValid(id)) throw "ERROR: ID IS NOT VALID";

  const siteCollection = await sites();

  const site = await siteCollection.findOne({ _id: id });
  if (!site) throw "ERROR: COULD NOT FIND SITE";

  site._id = site._id.toString();

  return site;
};

const getSitesByBorough = async (borough) => {
  if(!borough) throw "ERROR: BOROUGH IS REQUIRED";

  if(typeof borough !== "string") throw "ERROR: BOROUGH MUST BE A STRING";

  if (borough.trim().length === 0) throw "ERROR: BOROUGH CAN'T BE EMPTY STRING";

  borough = helpers.validBorough(borough);

  const siteCollection = await sites();

  const siteList = await siteCollection.find({borough: borough}).toArray();

  if (!siteList) throw "ERROR: COULD NOT FIND SITES";

  return siteList;
};

const getSitesByName = async (name) => {
  if(!name) throw "ERROR: NAME IS REQUIRED";

  if(typeof name !== "string") throw "ERROR: NAME MUST BE A STRING";

  if (name.trim().length === 0) throw "ERROR: NAME CAN'T BE EMPTY STRING";

  name = helpers.validSiteName(name);

  const siteCollection = await sites();

  const siteList = await siteCollection.find({name: name}).toArray();

  if (!siteList) throw "ERROR: COULD NOT FIND SITES";

  return siteList;
};

const getSitesByCategory = async (category) => {};

const getSitesByLocation = async (location) => {};

const getSitesByHours = async (hours) => {};

const sortSitesByAge = async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a,b)=>a.founded - b.founded)
}

const sortSitesByBorough = async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a,b)=>a.borough - b.borough)
}
const sortSitesByRatingHighToLow = async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a,b)=>b.rating - a.rating)
}
const sortSitesByRatingLowToHigh= async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a,b)=>a.rating - b.rating)
}
const searchSites = async(searchTerm) => {
  const allSites = await getAllSites();
  let filteredSites = [];
  for(let site of allSites){
    if(site.name.toLowerCase().includes(searchTerm.toLowerCase())){
      filteredSites.push(site)
    }
  }
  return filteredSites;
}

const updateSite = async (id, updatedSite) => {
  if (!id) throw "ERROR: ID IS REQUIRED";

  if (typeof id !== "string") throw "ERROR: ID MUST BE A STRING";

  if (id.trim().length === 0) throw "ERROR: ID CAN'T BE EMPTY STRING";

  id = helpers.validObjectID(id);

  if (!ObjectId.isValid(id)) throw "ERROR: ID IS NOT VALID";

  if (!updatedSite) throw "ERROR: UPDATED SITE IS REQUIRED";

  if (typeof updatedSite !== "object")
    throw "ERROR: UPDATED SITE MUST BE AN OBJECT";

  if (Object.keys(updatedSite).length === 0)
    throw "ERROR: UPDATED SITE CAN'T BE EMPTY";

  const siteCollection = await sites();

  const updatedSiteData = {};

  let newSite = await siteCollection.findOne({ _id: id });
  if (!newSite) throw "ERROR: COULD NOT FIND SITE";

  let updatedCount = 0;

  if (updatedSite.name) {
    if (updatedSite.name !== newSite.name) {
      updatedCount += 1;
    }
    updatedSiteData.name = helpers.validSiteName(updatedSite.name);
  } else {
    updatedSiteData.name = newSite.name;
  }

  if (updatedSite.description) {
    if (updatedSite.description !== newSite.description) {
      updatedCount += 1;
    }
    updatedSiteData.description = helpers.validSiteDescription(
      updatedSite.description
    );
  } else {
    updatedSiteData.description = newSite.description;
  }

  if (updatedSite.location) {
    if (updatedSite.location.name) {
      if (updatedSite.location.name !== newSite.location.name) {
        updatedCount += 1;
      }
      updatedSiteData["location.name"] = helpers.validString(
        updatedSite.location.name
      );
    } else {
      updatedSiteData["location.name"] = newSite.location.name;
    }

    if (updatedSite.location.address) {
      if (updatedSite.location.address !== newSite.location.address) {
        updatedCount += 1;
      }
      updatedSiteData["location.address"] = helpers.validString(
        updatedSite.location.address
      );
    } else {
      updatedSiteData["location.address"] = newSite.location.address;
    }

    if (updatedSite.location.city) {
      if (updatedSite.location.city !== newSite.location.city) {
        updatedCount += 1;
      }
      updatedSiteData["location.city"] = helpers.validString(
        updatedSite.location.city
      );
    } else {
      updatedSiteData["location.city"] = newSite.location.city;
    }

    if (updatedSite.location.state) {
      if (updatedSite.location.state !== newSite.location.state) {
        updatedCount += 1;
      }
      updatedSiteData["location.state"] = helpers.validState(
        updatedSite.location.state
      );
    } else {
      updatedSiteData["location.state"] = newSite.location.state;
    }

    if (updatedSite.location.zipCode) {
      if (updatedSite.location.zipCode !== newSite.location.zipCode) {
        updatedCount += 1;
      }
      updatedSiteData["location.zipCode"] = helpers.validZipcode(
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
      updatedSiteData["hours.day"] = helpers.validDays(updatedSite.hours.day);
    } else {
      updatedSiteData["hours.day"] = newSite.hours.day;
    }

    if (updatedSite.hours.time) {
      if (updatedSite.hours.time !== newSite.hours.time) {
        updatedCount += 1;
      }
      updatedSiteData["hours.time"] = helpers.validHours(
        updatedSite.hours.time
      );
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
    updatedSiteData.website = helpers.validWebsite(updatedSite.website);
  } else {
    updatedSiteData.website = newSite.website;
  }

  if (updatedSite.category) {
    if (updatedSite.category !== newSite.category) {
      updatedCount += 1;
    }
    updatedSiteData.category = helpers.validString(updatedSite.category);
  } else {
    updatedSiteData.category = newSite.category;
  }

  if (updatedSite.borough) {
    if (updatedSite.borough !== newSite.borough) {
      updatedCount += 1;
    }
    updatedSiteData.borough = helpers.validBorough(updatedSite.borough);
  } else {
    updatedSiteData.borough = newSite.borough;
  }

  if (updatedSite.founded) {
    if (updatedSite.founded !== newSite.founded) {
      updatedCount += 1;
    }
    updatedSiteData.founded = helpers.validAge(updatedSite.founded.toString());
    updateSiteData.founded = parseInt(updatedSiteData.founded);
  } else {
    updatedSiteData.founded = newSite.founded;
  }

  if (updatedCount === 0) throw "ERROR: NO UPDATES WERE MADE";

  const updatedInfo = await siteCollection.updateOne(
    { _id: id },
    { $set: updatedSiteData }
  );
  if (updatedInfo.modifiedCount === 0) throw "ERROR: COULD NOT UPDATE SITE";

  const updatedSiteFinal = await siteCollection.findOne({
    _id: id,
  });
  updatedSiteFinal._id = updatedSiteFinal._id.toString();

  return updatedSiteFinal;
};

const deleteSite = async (id) => {
  if (!id) throw "ERROR: ID IS REQUIRED";

  if (typeof id !== "string") throw "ERROR: ID MUST BE A STRING";

  if (id.trim().length === 0) throw "ERROR: ID CAN'T BE EMPTY STRING";

  id = helpers.validObjectID(id);

  if (!ObjectId.isValid(id)) throw "ERROR: ID IS NOT VALID";

  const siteCollection = await sites();

  const deletionInfo = await siteCollection.deleteOne({
    _id: id,
  });
  if (deletionInfo.deletedCount === 0)
    throw `ERROR: COULD NOT DELETE SITE WITH ID OF ${id}`;

  const site = await siteCollection.findOne({ _id: id });
  if (site) throw `ERROR: SITE WITH ID OF ${id} WAS NOT DELETED`;

  return { deleted: true, data: deletionInfo };
};

module.exports = {
  createSite,
  getAllSites,
  getSiteById,
  updateSite,
  deleteSite,
  sortSitesByAge,
  sortSitesByBorough,
  sortSitesByRatingHighToLow,
  sortSitesByRatingLowToHigh,
  searchSites,
  getSitesByBorough,
  getSitesByName
};
