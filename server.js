const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("join", (username) => {
    socket.username = username;

    socket.broadcast.emit(
      "system",
      username + " se conectó"
    );
  });

  socket.on("chat message", (msg) => {
    io.emit(
      "chat message",
      socket.username + ": " + msg
    );
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit(
        "system",
        socket.username + " se desconectó"
      );
    }
  });
});

http.listen(PORT, () => {
  console.log("Servidor funcionando en puerto " + PORT);
});
