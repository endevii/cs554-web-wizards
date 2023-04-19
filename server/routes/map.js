const express = require('express');
const router = express.Router();
const data = require("../data");
const sitesData = data.sites;

router.get('/', async (req, res) => {
    let sites;
    try{
        sites = await sitesData.getAllSites();
    } catch(e){
        return res.status(404).json({ error: "no historic sites found" });
    }
    return res.send(sites)
  });
  
module.exports = router;