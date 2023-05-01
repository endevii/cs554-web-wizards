const express = require('express');
const app = express();
const http = require('http');
const session = require('express-session');
const configRoutes = require('./routes');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
  })
);

configRoutes(app);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: /\localhost:3000/, methods: ['GET', 'POST'] },
});

io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('user_join', (name, room) => {
    console.log('A user joined their name is ' + name);
    socket.join('room' + room);
    socket.roomID = room;
    socket.userName = name;
    io.to('room' + room).emit('user_join', name);
  });

  socket.on('message', ({ name, message, room }) => {
    console.log(name, message, socket.id);
    io.to('room' + room).emit('message', { name, message });
  });

  socket.on('disconnect', () => {
    console.log('Disconnect Fired');
    io.to('room' + socket.roomID).emit('user_disconnect', socket.userName);
  });
});

server.listen(3001, function () {
  console.log('Server Started on http://localhost:3001');
});
