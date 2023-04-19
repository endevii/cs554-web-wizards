const express = require('express');
const router = express.Router();
const data = require("../data");
const sitesData = data.sites;

router
    .route('/sites')
    .get(async (req, res) => {
        let sites;
        try{
            sites = await sitesData.getAllSites();
        } catch (e) {
            return res.status(404).json({error: "no historic sites found"});
        }
        return res.status(200).send(sites)
    })

router
    .route('/site/:id')
    .get(async (req, res) => {
        let id = req.params.id;
        let site;
        try{
            site = await sitesData.getSiteById(id);
        } catch (e) {
            return res.status(404).json({error: "no historic site found with that id"});
        }
        return res.status(200).send(site)
    })

module.exports = router;