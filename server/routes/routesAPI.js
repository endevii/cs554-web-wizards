const express = require("express");
const router = express.Router();
const data = require("../data");
const sitesData = data.sites;

const path = require("path");

 router
  .route('/siteBorough/:borough')
  .get(async (req, res) => {
      let borough = req.params.borough;
      let site;
      try{
          site = await sitesData.getSitesByBorough(borough);
      } catch (e) {
          return res.status(404).json({error: "no historic site found with that bororugh"});
      }
      return res.status(200).send(site)
  })

router 
    .route('/sites/sort/age')
    .get(async (req, res)=> {
        try {
            const sites = await sitesData.sortSitesByAge();
            return res.json(sites)
        }catch(e) {
            return res.status(404).json({error: "no historic data found"})
        }
    })
router
  .route("/generatepdf")
  .post(async (req, res) => {
    if(!req.body.input || !req.body.name){
        return res.status(400).json({error: "invalid input"})
    }
    try {
      data.htmltopdf.generatePdf(req.body.input, req.body.name);
      return res.json({ msg: "Pdf generated successfully" });
    } catch (e) {
      return res.status(500).json({error: e});
    }
  });

router.route("/generatedpdf/:name").get(async (req, res) => {
  let name = req.params.name;
  try {
    return res.sendFile(path.resolve("generatedPdfs/" + name + ".pdf"));
  } catch (e) {
    return res.status(404).json({error: "pdf not found"})
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

router.route("/site/:id").get(async (req, res) => {
  let id = req.params.id;
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
module.exports = router;
