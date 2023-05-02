const express = require("express");
const router = express.Router();
const data = require("../data");
const fs = require("fs");
const path = require("path");

router
  .route("/")
  .post(async (req, res) => {
    if(!req.body.input || !req.body.name){
        return res.status(400).json({error: "invalid input"})
    }
    try {
      let result = data.htmltopdf.generatePdf(req.body.input, req.body.name);
      return res.json({ msg: result });
    } catch (e) {
      return res.status(500).json({error: e});
    }
  });

router.route("/:name").get(async (req, res) => {
  let name = req.params.name;
  let pdfFile = path.resolve("generatedPdfs/"+name+".pdf")
  
  try {
    if(fs.existsSync(pdfFile)){
        return res.sendFile(pdfFile);
    }else{
        return res.status(404).send("Pdf not found, try reloading again")
    }
  } catch (e) {
    return res.status(404).json({error: "pdf not found, try again"})
  }
});

module.exports = router;
