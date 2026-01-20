const socket = io();

let username = "";

while (!username) {
  username = prompt("Ingresá tu nombre:");
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

socket.on("chat message", (data) => {
  addMessage(data.username + ": " + data.message, data.color);
});

socket.on("system", (data) => {
  addMessage(data.text, data.color);
});

function addMessage(text, color) {
  const item = document.createElement("li");
  item.textContent = text;
  item.style.color = color || "#ffffff";
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}
