const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// servir archivos del frontend
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // recibir mensaje
  socket.on("mensaje", (msg) => {
    // reenviar a todos
    io.emit("mensaje", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});

