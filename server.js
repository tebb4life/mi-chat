const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 👇 ESTA FUNCIÓN VA ACÁ
function getRandomColor() {
  const colors = [
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#9b59b6",
    "#f1c40f",
    "#e67e22",
    "#1abc9c"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

app.use(express.static("public"));

io.on("connection", (socket) => {

  socket.color = getRandomColor();

  socket.on("join", (username) => {
    socket.username = username;
    socket.broadcast.emit("system", {
      text: `${username} se conectó`,
      color: socket.color
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      user: socket.username,
      msg: msg,
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

server.listen(3000, () => {
  console.log("Servidor funcionando");
});
