const express = require("express");
const router = express.Router();
const data = require("../data");
const sitesData = data.sites;
const usersData = data.users;
const validation = require("../validation");

router.get("/:uid/", async (req, res) => {
  // get the sites waiting to be approved
  let uid = req.params.uid;
  try {
    uid = validation.validObjectID(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  let isAdmin;
  try {
    isAdmin = await usersData.checkIfAdmin(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  if (!isAdmin) {
    return res.status(401).json({ error: "user is not an admin" });
  }

  try {
    const sites = await sitesData.getAllWaitingSites();
    res.json(sites);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:uid/approve/:id", async (req, res) => {
  // approve a site
  let uid = req.params.uid;
  try {
    uid = validation.validObjectID(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  let isAdmin;
  try {
    isAdmin = await usersData.checkIfAdmin(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  if (!isAdmin) {
    return res.status(401).json({ error: "user is not an admin" });
  }

  let id = req.params.id;
  try {
    id = validation.validString(id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const site = await sitesData.getWaitingSiteById(id);
    const newSite = await sitesData.createSite(
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
    await sitesData.removeWaitingSite(id);
    return res.json(newSite);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.route("/:uid/update/:id").patch(async (req, res) => {
  // update a site before approving it (must meet checks)
  let uid = req.params.uid;
  try {
    uid = validation.validObjectID(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  let isAdmin;
  try {
    isAdmin = await usersData.checkIfAdmin(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  if (!isAdmin) {
    return res.status(401).json({ error: "user is not an admin" });
  }

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
    site = await sitesData.getWaitingSiteById(id);
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
    updatedSite = await sitesData.updateWaitingSite(id, updatedSite);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  return res.status(200).send(updatedSite);
});

router.route("/:uid/delete/:id").delete(async (req, res) => {
  // delete a site if it is nonsense
  let uid = req.params.uid;
  try {
    uid = validation.validObjectID(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  let isAdmin;
  try {
    isAdmin = await usersData.checkIfAdmin(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  if (!isAdmin) {
    return res.status(401).json({ error: "user is not an admin" });
  }

  let id = req.params.id;
  try {
    id = validation.validObjectID(id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    await sitesData.getWaitingSiteById(id);
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that id" });
  }

  try {
    let deletedSite = await sitesData.removeWaitingSite(id);
  } catch (e) {
    return res
      .status(404)
      .json({ error: "no historic site found with that id" });
  }

  return res.status(200).send({ message: "site deleted successfully" });
});

router.route("/:uid/addpermission/:id/:permission").patch(async (req, res) => {
  // add permissions to a user
  let uid = req.params.uid;
  try {
    uid = validation.validObjectID(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  let isAdmin;
  try {
    isAdmin = await usersData.checkIfAdmin(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  if (!isAdmin) {
    return res.status(401).json({ error: "user is not an admin" });
  }

  let id = req.params.id;
  try {
    id = validation.validObjectID(id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  let permission = req.params.permission;
  try {
    permission = validation.validString(permission);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    await usersData.getUserById(id);
  } catch (e) {
    return res.status(404).json({ error: "no user found with that id" });
  }
  let updatedUser;
  try {
    updatedUser = await usersData.addPermission(id, permission);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  return res
    .status(200)
    .send({ message: "permission added successfully", user: updatedUser });
});

router
  .route("/:uid/removepermission/:id/:permission")
  .patch(async (req, res) => {
    // remove permissions from a user
    let uid = req.params.uid;
    try {
      uid = validation.validObjectID(uid);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    let isAdmin;
    try {
      isAdmin = await usersData.checkIfAdmin(uid);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    if (!isAdmin) {
      return res.status(401).json({ error: "user is not an admin" });
    }

    let id = req.params.id;
    try {
      id = validation.validObjectID(id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    let permission = req.params.permission;
    try {
      permission = validation.validString(permission);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    let user;
    try {
      user = await usersData.getUserById(id);
    } catch (e) {
      return res.status(404).json({ error: "no user found with that id" });
    }

    if (user.permissions.length === 0) {
      return res.status(400).json({ error: "user has no permissions" });
    }

    let updatedUser;
    try {
      updatedUser = await usersData.removePermission(id, permission);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    return res
      .status(200)
      .send({ message: "permission removed successfully", user: updatedUser });
  });

module.exports = router;
