const routesAPI = require("./routesAPI");
const mapRoutes = require("./map");
const reviewRoutes = require("./reviews");
const generatePdfRoutes = require("./generatePdf");

const constructorMethod = (app) => {
  app.use("/", routesAPI);
  app.use("/map", mapRoutes);
  app.use("/reviews", reviewRoutes);
  app.use("/generatepdf", generatePdfRoutes)

  app.use("*", (req, res) => {
    res.json({ error: "Route not valid" });
  });
};

module.exports = constructorMethod;
