const mongoCollections = require("../config/mongoCollections");
const sites = mongoCollections.sites;
const waitingSites = mongoCollections.waitingSites;
const { ObjectId } = require("mongodb");
const helpers = require("../validation");
const im = require("imagemagick");

const createSite = async (
  name,
  description,
  location,
  hours,
  website,
  category,
  borough,
  age,
  image
) => {
  try {
    name = helpers.validSiteName(name);
    description = helpers.validSiteDescription(description);
    locAddress = helpers.validString(location.address, "LOCATION ADDRESS");
    locCity = helpers.validString(location.city, "LOCATION CITY");
    locState = helpers.validState(location.state);
    locZip = helpers.validZipcode(location.zipCode);
    locCoords = helpers.validCoordinates(location.coordinates);

    //timeDay = helpers.validDays(hours.days);
    //timeOpen = helpers.validHours(hours.time);
    timeDay = hours.days;
    timeOpen = hours.time;

    website = helpers.validWebsite(website);

    if (category && category.length === 0) {
      category = "Other";
    } else if (!category) {
      category = "Other";
    }

    category = helpers.validString(category, "CATEGORY");

    borough = helpers.validBorough(borough);
    age = helpers.validAge(age.toString());

    image = helpers.validImage(image);

    /*im.identify(image, function (err, features) {
      if (err) console.log(err);
      console.log(features.filename);
    })
    im.convert([image, '-resize', ], function (err, stdout) {
      if (err) throw (err);
      image = stdout;
    })*/

    age = parseInt(age);
  } catch (e) {
    throw e;
  }
  const siteCollection = await sites();
  let newSite = {
    _id: new ObjectId().toString(),
    name: name,
    description: description,
    location: {
      address: locAddress,
      city: locCity,
      state: locState,
      zipCode: locZip,
      coordinates: locCoords,
    },
    hours: {
      days: timeDay,
      time: timeOpen,
    },
    website: website,
    category: category,
    borough: borough,
    founded: age,
    rating: 0,
    reviews: [],
    image: image,
  };

  const insertInfo = await siteCollection.insertOne(newSite);
  if (insertInfo.insertedCount === 0) throw "ERROR: COULD NOT ADD SITE";

  return newSite;
};

const createSiteToBeApproved = async (
  name,
  description,
  location,
  hours,
  website,
  category,
  borough,
  age,
  image,
  user
) => {
  try {
    name = helpers.validSiteName(name);
    description = helpers.validSiteDescription(description);
    locAddress = helpers.validString(location.address, "LOCATION ADDRESS");
    locCity = helpers.validString(location.city, "LOCATION CITY");
    locState = helpers.validState(location.state);
    locZip = helpers.validZipcode(location.zipCode);
    locCoords = helpers.validCoordinates(location.coordinates);

    timeDay = helpers.validDays(hours.days);
    timeOpen = helpers.validHours(hours.time);

    website = helpers.validWebsite(website);

    if (category && category.length === 0) {
      category = "Other";
    } else if (!category) {
      category = "Other";
    }

    category = helpers.validString(category, "CATEGORY");

    borough = helpers.validBorough(borough);
    age = helpers.validAge(age.toString());

    image = helpers.validImage(image);

    age = parseInt(age);

    user = helpers.validString(user, "USER");
  } catch (e) {
    throw e;
  }

  const waitingCollection = await waitingSites();

  let newSite = {
    _id: new ObjectId().toString(),
    name: name,
    description: description,
    location: {
      address: locAddress,
      city: locCity,
      state: locState,
      zipCode: locZip,
      coordinates: locCoords,
    },
    hours: {
      days: timeDay,
      time: timeOpen,
    },
    website: website,
    category: category,
    borough: borough,
    founded: age,
    image: image,
    user: user,
  };

  const insertInfo = await waitingCollection.insertOne(newSite);
  if (insertInfo.insertedCount === 0) throw "ERROR: COULD NOT ADD SITE";

  return newSite;
};

const getAllWaitingSites = async () => {
  const waitingCollection = await waitingSites();

  const waitingList = await waitingCollection.find({}).toArray();

  for (let i = 0; i < waitingList.length; i++) {
    waitingList[i]._id = waitingList[i]._id.toString();
  }

  return waitingList;
};

const getWaitingSiteById = async (id) => {
  if (!id) throw "ERROR: ID IS REQUIRED";

  if (typeof id !== "string") throw "ERROR: ID MUST BE A STRING";

  if (id.trim().length === 0) throw "ERROR: ID CAN'T BE EMPTY STRING";

  id = helpers.validObjectID(id);

  if (!ObjectId.isValid(id)) throw "ERROR: ID IS NOT VALID";

  const waitingCollection = await waitingSites();

  const waiting = await waitingCollection.findOne({ _id: id });
  if (!waiting) throw "ERROR: COULD NOT FIND SITE";

  waiting._id = waiting._id.toString();

  return waiting;
};

const removeWaitingSite = async (id) => {
  if (!id) throw "ERROR: ID IS REQUIRED";

  if (typeof id !== "string") throw "ERROR: ID MUST BE A STRING";

  if (id.trim().length === 0) throw "ERROR: ID CAN'T BE EMPTY STRING";

  id = helpers.validObjectID(id);

  if (!ObjectId.isValid(id)) throw "ERROR: ID IS NOT VALID";

  const waitingCollection = await waitingSites();

  const waiting = await waitingCollection.findOne({ _id: id });
  if (!waiting) throw "ERROR: COULD NOT FIND SITE";

  const deletedSite = await waitingCollection.deleteOne({ _id: id });
  if (deletedSite.deletedCount === 0) throw "ERROR: COULD NOT DELETE SITE";

  return true;
};

const updateWaitingSite = async (id, updatedSite) => {
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

  const waitingCollection = await waitingSites();

  let updatedSiteData = {};

  let newSite = await waitingCollection.findOne({ _id: id });
  if (!newSite) throw "ERROR: COULD NOT FIND SITE";

  try {
    updatedSiteData = helpers.siteChanges(newSite, updatedSite);
  } catch (e) {
    throw e;
  }
  updatedSiteData._id = id;
  updatedSiteData.rating = newSite.rating;
  updatedSiteData.reviews = newSite.reviews;
  updatedSiteData.founded = parseInt(updatedSiteData.founded);
  updatedSiteData.user = newSite.user;

  const updatedInfo = await waitingCollection.updateOne(
    { _id: id },
    { $set: updatedSiteData }
  );
  if (updatedInfo.modifiedCount === 0) throw "ERROR: COULD NOT UPDATE SITE";

  const updatedSiteFinal = await waitingCollection.findOne({
    _id: id,
  });
  updatedSiteFinal._id = updatedSiteFinal._id.toString();

  return updatedSiteFinal;
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
  if (!borough) throw "ERROR: BOROUGH IS REQUIRED";

  if (typeof borough !== "string") throw "ERROR: BOROUGH MUST BE A STRING";

  if (borough.trim().length === 0) throw "ERROR: BOROUGH CAN'T BE EMPTY STRING";

  borough = helpers.validBorough(borough);

  const siteCollection = await sites();

  const siteList = await siteCollection.find({ borough: borough }).toArray();

  if (!siteList) throw "ERROR: COULD NOT FIND SITES";

  return siteList;
};

const getSitesByName = async (name) => {
  if (!name) throw "ERROR: NAME IS REQUIRED";

  if (typeof name !== "string") throw "ERROR: NAME MUST BE A STRING";

  if (name.trim().length === 0) throw "ERROR: NAME CAN'T BE EMPTY STRING";

  name = helpers.validSiteName(name);

  const siteCollection = await sites();

  const siteList = await siteCollection.find({ name: name }).toArray();

  if (!siteList) throw "ERROR: COULD NOT FIND SITES";

  return siteList;
};

const getSitesByCategory = async (category) => {};

const getSitesByLocation = async (location) => {};

const getSitesByHours = async (hours) => {};

const sortSitesByAge = async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a, b) => a.founded - b.founded);
};

const sortSitesByBorough = async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a, b) => a.borough - b.borough);
};
const sortSitesByRatingHighToLow = async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a, b) => b.rating - a.rating);
};
const sortSitesByRatingLowToHigh = async () => {
  const unsortedSites = await getAllSites();
  return unsortedSites.sort((a, b) => a.rating - b.rating);
};
const searchSites = async (searchTerm) => {
  const allSites = await getAllSites();
  let filteredSites = [];
  for (let site of allSites) {
    if (site.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredSites.push(site);
    }
  }
  return filteredSites;
};

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

  let updatedSiteData = {};

  let newSite = await siteCollection.findOne({ _id: id });
  if (!newSite) throw "ERROR: COULD NOT FIND SITE";

  try {
    updatedSiteData = helpers.siteChanges(newSite, updatedSite);
  } catch (e) {
    throw e;
  }

  updatedSiteData._id = id;
  updatedSiteData.rating = newSite.rating;
  updatedSiteData.reviews = newSite.reviews;
  updatedSiteData.founded = parseInt(updatedSiteData.founded);

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
  getSitesByName,
  createSiteToBeApproved,
  getAllWaitingSites,
  getWaitingSiteById,
  removeWaitingSite,
  updateWaitingSite,
};
