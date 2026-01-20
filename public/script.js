const socket = io();

let username = "";

while (!username) {
  username = prompt("Ingresa tu nombre");
}

socket.emit("join", username);

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim()) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

// mensajes normales
socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.innerHTML = `<strong style="color:${data.color}">${data.username}</strong>: ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

// mensajes del sistema
socket.on("system", (data) => {
  const item = document.createElement("li");
  item.innerHTML = `<em style="color:${data.color}">${data.text}</em>`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
