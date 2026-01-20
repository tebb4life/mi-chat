const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static("public"));

function getRandomColor() {
  const colors = [
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#9b59b6",
    "#f1c40f",
    "#e67e22",
    "#1abc9c",
    "#34495e"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("join", (username) => {
    socket.username = username;
    socket.color = getRandomColor();

    socket.broadcast.emit("system", {
      text: `${username} se conectó`,
      color: socket.color
    });
  });

  socket.on("chat message", (message) => {
    if (!socket.username) return;

    io.emit("chat message", {
      username: socket.username,
      message: message,
      color: socket.color
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit("system", {
        text: `${socket.username} se desconectó`,
        color: socket.color
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
