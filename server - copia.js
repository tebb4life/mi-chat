const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // cuando alguien entra al chat
  socket.on("nuevo_usuario", (nombre) => {
    io.emit("mensaje", {
      nombre: "Sistema",
      texto: nombre + " se unió al chat"
    });
  });

  // cuando alguien envía un mensaje
  socket.on("mensaje", (data) => {
    io.emit("mensaje", data);
  });

});

server.listen(3000, () => {
  console.log("Servidor funcionando en puerto 3000");
});
