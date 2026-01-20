const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// colores

const userColors = {};

function randomColor() {
  const colors = [
    "#3b82f6", // azul
    "#22c55e", // verde
    "#f97316", // naranja
    "#a855f7", // violeta
    "#ef4444", // rojo
    "#06b6d4", // celeste
    "#eab308"  // amarillo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}


io.on("connection", (socket) => {

socket.on("join", (username) => {
  socket.username = username;

  socket.color = getRandomColor();

  socket.broadcast.emit("user-connected", {
    user: username,
    color: socket.color
  });
});


socket.on("send-message", (message) => {
  io.emit("chat-message", {
    user: socket.username,
    message: message,
    color: socket.color
  });
});

socket.on("disconnect", () => {
  socket.broadcast.emit("user-disconnected", {
    user: socket.username,
    color: socket.color
  });
});


  // mensajes normales
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  // cuando se va
  socket.on("disconnect", () => {
    if (socket.nombre) {
      io.emit("mensaje sistema", `🔴 ${socket.nombre} salió del chat`);
    }
  });
});

http.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
