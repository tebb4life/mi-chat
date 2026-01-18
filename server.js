const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

// Servir los archivos estáticos desde public
app.use(express.static(path.join(__dirname, "public")));

// Servir index.html en la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Manejar conexiones de socket
io.on("connection", (socket) => {
  console.log("Usuario conectado");

  // Recibir mensajes del cliente
  socket.on("chat message", (msg) => {
    // Reenviar mensaje a todos los clientes conectados
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Escuchar puerto de Render o 3000 local
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
