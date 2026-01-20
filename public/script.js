const socket = io();

let username = "";

while (!username) {
  username = prompt("Ingresá tu nombre");
}

socket.emit("join", username);

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() !== "") {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

// MENSAJES NORMALES
socket.on("chat message", (data) => {
  const item = document.createElement("li");

  item.innerHTML = `
    <span style="color:${data.color}; font-weight:bold">
      ${data.username}
    </span>: ${data.message}
  `;

  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// MENSAJES DEL SISTEMA
socket.on("system", (data) => {
  const item = document.createElement("li");

  item.innerHTML = `
    <em style="color:${data.color}">
      ${data.text}
    </em>
  `;

  messages.appendChild(item);
});
