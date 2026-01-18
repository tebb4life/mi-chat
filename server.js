const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // permite conexiones desde cualquier lugar
    methods: ["GET", "POST"]
  }
});

// Servir archivos estáticos de la carpeta public
app.use(express.static("public"));

// Manejar conexiones de Socket.IO
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Escuchar mensajes
  socket.on("chat message", (msg) => {
    console.log("Mensaje recibido:", msg);
    // Enviar a todos los clientes conectados
    io.emit("chat message", msg);
  });

  // Desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Puerto de Render o local
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
