const express = require("express");
const router = express.Router();
const data = require("../data");
const sitesData = data.sites;
const usersData = data.users;
const validation = require("../validation");

router.route("/siteBorough/:borough").get(async (req, res) => {
  let borough = req.params.borough;
  let site;
  try {
    site = await sitesData.getSitesByBorough(borough);
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that bororugh" });
  }
  return res.status(200).send(site);
});

router.route("/sites/sort/age").get(async (req, res) => {
  try {
    const sites = await sitesData.sortSitesByAge();
    return res.json(sites);
  } catch (e) {
    return res.status(404).json({ error: "no historic data found" });
  }
});

router.route("/sites").get(async (req, res) => {
  let sites;
  try {
    sites = await sitesData.getAllSites();
  } catch (e) {
    return res.status(404).json({ error: "no historic sites found" });
  }
  return res.status(200).send(sites);
});

router.route("/siteBorough/:borough").get(async (req, res) => {
  let borough = req.params.borough;
  let site;
  try {
    site = await sitesData.getSitesByBorough(borough);
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that bororugh" });
  }
  return res.status(200).send(site);
});

router.route("/sites").post(async (req, res) => {
  let site = req.body;
  let errors = [];
  try {
    if (site.category.length === 0) {
      site.category = "Other";
    }
    site = validation.validSite(site);
  } catch (e) {
    errors = e;
  }
  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }
  // name, description, location, hours, website, category, borough, age, image;

  try {
    site = await sitesData.createSite(
      site.name,
      site.description,
      site.location,
      site.hours,
      site.website,
      site.category,
      site.borough,
      site.founded,
      site.image
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  return res.status(200).send(site);
});

router.route("/sites/request/:user").post(async (req, res) => {
  let site = req.body;
  let user = req.params.user;
  let errors = [];
  try {
    user = validation.validString(user);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    if (site.category.length === 0) {
      site.category = "Other";
    }
    site = validation.validSite(site);
  } catch (e) {
    errors = e;
  }
  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }
  // name, description, location, hours, website, category, borough, age, image;

  try {
    site = await sitesData.createSiteToBeApproved(
      site.name,
      site.description,
      site.location,
      site.hours,
      site.website,
      site.category,
      site.borough,
      site.founded,
      site.image,
      user
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  return res.status(200).send(site);
});

router.route("/sites/:id").delete(async (req, res) => {
  let id = req.params.id;
  try {
    id = validation.validObjectID(id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    await sitesData.getSiteById(id);
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that id" });
  }

  try {
    await sitesData.deleteSite(id);
    return res.status(200).send({ message: "site deleted successfully" });
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that id" });
  }
});

router.route("/sites/:id").patch(async (req, res) => {
  let id = req.params.id;
  try {
    id = validation.validObjectID(id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  let updatedSite = req.body;

  let site;

  try {
    updatedSite = validation.checkToBeUpdated(updatedSite);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    site = await sitesData.getSiteById(id);
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that id" });
  }

  try {
    validation.siteChanges(site, updatedSite);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    updatedSite = await sitesData.updateSite(id, updatedSite);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  return res.status(200).send(updatedSite);
});

router.route("/site/:id").get(async (req, res) => {
  let id = req.params.id;
  try {
    id = validation.validObjectID(id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  let site;
  try {
    site = await sitesData.getSiteById(id);
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that id" });
  }
  return res.status(200).send(site);
});

router.route("/sites/sort/age").get(async (req, res) => {
  try {
    const sites = await sitesData.sortSitesByAge();
    return res.json(sites);
  } catch (e) {
    return res.status(404).json({ error: "no historic data found" });
  }
});

router.route("/sites/sort/borough").get(async (req, res) => {
  try {
    const sites = await sitesData.sortSitesByBorough();
    return res.json(sites);
  } catch (e) {
    return res.status(404).json({ error: "no historic data found" });
  }
});

router.route("/sites/sort/ratingHighToLow").get(async (req, res) => {
  try {
    const sites = await sitesData.sortSitesByRatingHighToLow();
    return res.json(sites);
  } catch (e) {
    return res.status(404).json({ error: "no historic data found" });
  }
});

router.route("/sites/sort/ratingLowToHigh").get(async (req, res) => {
  try {
    const sites = await sitesData.sortSitesByRatingLowToHigh();
    return res.json(sites);
  } catch (e) {
    return res.status(404).json({ error: "no historic data found" });
  }
});

router.route("/sites/search/:searchTerm").get(async (req, res) => {
  let searchTerm = req.params.searchTerm;
  try {
    const sites = await sitesData.searchSites(searchTerm);
    return res.json(sites);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

router.route("/sites/name/:name").get(async (req, res) => {
  let name = req.params.name;
  try {
    const sites = await sitesData.getSitesByName(name);
    return res.json(sites);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

router.route("/user/:uid").get(async (req, res) => {
  let uid = req.params.uid;
  try {
    const user = await usersData.getUserById(uid);
    return res.json(user);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

router.route("/adduser/:uid").get(async (req, res) => {
  let uid = req.params.uid;
  try {
    const user = await usersData.createUser(uid);
    return res.json(user);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

router.route("/addItinerary/:uid").get(async (req, res) => {
  let uid = req.params.uid;
  let itinerary = JSON.parse(req.query.itinerary);
  try {
    const user = await usersData.addItinerary(uid, itinerary);
    return res.json(user);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

router.route("/deleteItinerary/:uid").get(async (req, res) => {
  let uid = req.params.uid;
  let itinerary = JSON.parse(req.query.itinerary);
  try {
    const user = await usersData.deleteItinerary(uid, itinerary);
    return res.json(user);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

router.route("/has/:uid").get(async (req, res) => {
  let uid = req.params.uid;
  let itinerary = JSON.parse(req.query.itinerary);
  try {
    const user = await usersData.userHasItinerary(uid, itinerary);
    return res.json(user);
  } catch (e) {
    return res.status(404).json({ error: e });
  }
});

module.exports = router;
