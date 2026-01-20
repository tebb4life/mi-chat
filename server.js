const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// carpeta pública
app.use(express.static("public"));

// puerto (Render usa process.env.PORT)
const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {

  console.log("Usuario conectado");

  socket.on("join", (username) => {
    socket.username = username;
    socket.color = getRandomColor();

    // aviso a los demás
    socket.broadcast.emit("system", {
      text: `${username} se conectó`,
      color: socket.color
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      username: socket.username,
      message: msg,
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

// función colores
function getRandomColor() {
  const colors = [
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#f1c40f",
    "#9b59b6",
    "#1abc9c",
    "#e67e22"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// iniciar servidor
server.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});
