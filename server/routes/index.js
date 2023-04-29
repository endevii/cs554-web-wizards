const routesAPI = require("./routesAPI");
const mapRoutes = require("./map");
const reviewRoutes = require("./review");

const constructorMethod = (app) => {
  app.use("/", routesAPI);
  app.use("/map", mapRoutes);
  app.use("/reviews", reviewRoutes);

  app.use("*", (req, res) => {
    res.json({ error: "Route nto valid" });
  });
};

module.exports = constructorMethod;
