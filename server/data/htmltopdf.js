const fs = require("fs");
const path = require("path");

const wkhtmltopdf = require("wkhtmltopdf");
const cssRules = {
  stepImageOne: "grid-column: 10 / span 3; grid-row: 13 / span 20;",
  stepImageTwo: "grid-column: 13 / span 3; grid-row: 1 / span 20;",
  stepImageThree: " grid-column: 1 / span 3;grid-row: 10 / span 20;",
  stepImageFour: "grid-column: 4 / span 3;grid-row: 2 / span 20;",
  "itinerary-description":
    " grid-column: 2 / span 6; grid-row: 2 / span 27;font-size: x-large;",
  "itinerary-description-two":
    " grid-column: 7 / span 6; grid-row: 2 / span 27; font-size: x-large;",
  "step-description":
    " grid-column: 2 / span 6;grid-row: 1 / span 27;font-size: large;",
  "step-description-two":
    " grid-column: 7 / span 6;grid-row: 2 / span 27;font-size: large;",
  "hr-custom": " background-color: #c24646;",
  resize: " width: 300px;height: auto;",
  "resize-image": " width: 200px;height: auto;",
  revolution: "width: 70%;margin: auto;",
  "itinerary-container": "display: grid;gap: 10px;padding: 10px;",
  "itinerary-title":
    " grid-column: 1 / span 15;grid-row: 1;text-align: center;",
  "itinerary-stop-title":
    " grid-column: 1 / span 15;grid-row: 1;text-align: left;font-size: x-large;padding: 1%;",
  itinerary: " background-color: #ffdcdc;",
  "grid-item step-description":
    "text-align: center;padding: 20px;font-size: 30px; grid-column: 2 / span 6;grid-row: 1 / span 27;font-size: large;",
  "grid-item step-description-two":
    "text-align: center;padding: 20px;font-size: 30px;  grid-column: 7 / span 6; grid-row: 2 / span 27; font-size: large;",
};

const classNames = [
  "stepImageOne",
  "stepImageTwo",
  "stepImageThreee",
  "stepImageFour",
  "itinerary-description",
  "itinerary-description-two",
  "step-description",
  "step-description-two",
  "hr-custom",
  "resize",
  "resize-image",
  "revolution",
  "itinerary-container",
  "itinerary-title",
  "itinerary-stop-title",
  "itinerary",
  "grid-item step-description",
  "grid-item step-description-two",
];
const setStyling = (htmlInput, className) => {
  return htmlInput.replaceAll(
    `class=\'${className}\'`,
    `class=\'${className}\' style=\'${cssRules[className]}\'`
  );
};
const generatePdf = (input, name) => {
  input = input.replace(/(\r\n|\n|\r)/gm, "");
  let htmlString = "";
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '"') {
      htmlString = htmlString + "'";
    } else {
      htmlString = htmlString + input[i];
    }
  }

  for (let key of classNames) {
    htmlString = setStyling(htmlString, key);
  }

  htmlString =
    "<!doctype html>" +
    "<html lang='en'>" +
    "<head>" +
    "<title>" +
    name +
    "</title> <meta  charset='utf-8'>" +
    " </head>" +
    "<body>" +
    htmlString +
    "</body></html>";
  let file = wkhtmltopdf(htmlString, {
    output: `generatedPdfs/${name}.pdf`,
    pageSize: "letter",
  });
  
  let pdfFile = path.resolve("generatedPdfs/"+name+".pdf")
  if(fs.existsSync(pdfFile)){
    return "success"
  }else{
    return "error"
  }
};
module.exports = {
  generatePdf,
};
