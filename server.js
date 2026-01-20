const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // cuando alguien entra
  socket.on("usuario conectado", (nombre) => {
    socket.nombre = nombre;
    io.emit("mensaje sistema", `🟢 ${nombre} se conectó`);
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
