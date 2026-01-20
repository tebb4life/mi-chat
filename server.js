const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = [];

io.on("connection", (socket) => {

  socket.on("join", (username) => {
    socket.username = username;
    users.push(username);

    io.emit("users", users);
    socket.broadcast.emit("system", `${username} se conectó`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", `${socket.username}: ${msg}`);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      users = users.filter(u => u !== socket.username);

      io.emit("users", users);
      io.emit("system", `${socket.username} se desconectó`);
    }
  });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});
