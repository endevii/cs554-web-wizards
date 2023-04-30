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
    console.log("here1");
    timeDay = helpers.validDays(hours.days);
    timeOpen = helpers.validHours(hours.time);
    console.log("here1.5");
    website = helpers.validWebsite(website);
    console.log("here2");

    if (category && category.length === 0) {
      category = "Other";
    } else if (!category) {
      category = "Other";
    }
    console.log("here2.5");
    category = helpers.validString(category, "CATEGORY");

    console.log("here3");
    borough = helpers.validBorough(borough);
    age = helpers.validAge(age.toString());

    image = helpers.validImage(image);

    age = parseInt(age);
  } catch (e) {
    throw e;
  }
  const siteCollection = await sites();
  console.log("here");
  let newSite = {
    name: name,
    description: description,
    location: {
      name: locName,
      address: locAddress,
      city: locCity,
      state: locState,
      zipCode: locZip,
      coordinates: locCoords,
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
    image: image,
  };

  const insertInfo = await siteCollection.insertOne(newSite);
  if (insertInfo.insertedCount === 0) throw "ERROR: COULD NOT ADD SITE";

  const newId = insertInfo.insertedId;

  const site = await siteCollection.findOne({ _id: new ObjectId(newId) });
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

const getSitesByBorough = async (borough) => {};

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

  const updatedSiteData = {};

  let newSite = await siteCollection.findOne({ _id: new ObjectId(id) });
  if (!newSite) throw "ERROR: COULD NOT FIND SITE";

  try {
    updatedSiteData = helpers.siteChanges(newSite, updatedSite);
  } catch (e) {
    throw e;
  }

  const updatedInfo = await siteCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedSiteData }
  );
  if (updatedInfo.modifiedCount === 0) throw "ERROR: COULD NOT UPDATE SITE";

  const updatedSiteFinal = await siteCollection.findOne({
    _id: new ObjectId(id),
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
    _id: new ObjectId(id),
  });
  if (deletionInfo.deletedCount === 0)
    throw `ERROR: COULD NOT DELETE SITE WITH ID OF ${id}`;

  const site = await siteCollection.findOne({ _id: new ObjectId(id) });
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
};
