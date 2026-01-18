const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

 HEAD
// Servir la carpeta "public" (donde estará index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz

// Servir la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
 18a7de3 (Preparado para Render)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado');
<<<<<<< HEAD
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
=======

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
>>>>>>> 18a7de3 (Preparado para Render)
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
