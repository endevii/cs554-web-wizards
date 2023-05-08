const express = require("express");
const app = express();
const http = require("http");
const session = require("express-session");
const configRoutes = require("./routes");
const cors = require("cors");
const { Server } = require("socket.io");
const validation = require("./validation");
const data = require("./data");
const usersData = data.users;

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

app.use("/admin/:uid", async (req, res, next) => {
  let uid = req.params.uid;

  try {
    uid = validation.validString(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  let isAdmin;
  try {
    isAdmin = await usersData.checkIfAdmin(uid);
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  if (isAdmin === false) {
    return res
      .status(403)
      .json({ error: "You do not have permission to access this page." });
  }
  next();
});

configRoutes(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: /\localhost:3000/, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {

  socket.on("user_join", (name, room) => {
    socket.join("room" + room);
    socket.roomID = room;
    socket.userName = name;
    io.to("room" + room).emit("user_join", name);
  });

  socket.on("message", ({ name, message, room }) => {
    io.to("room" + room).emit("message", { name, message });
  });

  socket.on("disconnect", () => {
    io.to("room" + socket.roomID).emit("user_disconnect", socket.userName);
  });
});

server.listen(3001, function () {
  console.log("Server Started on http://localhost:3001");
});
