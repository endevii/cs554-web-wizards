const express = require("express");
const app = express();
const session = require("express-session");
const configRoutes = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

configRoutes(app);

app.listen(3001, function () {
  console.log("Server Started on http://localhost:3001");
});
