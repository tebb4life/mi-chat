const socket = io();

let username = "";

while (!username) {
  username = prompt("¿Cuál es tu nombre?");
}

socket.emit("join", username);

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.textContent = `${data.user}: ${data.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("system", (msg) => {
  const item = document.createElement("li");
  item.style.fontStyle = "italic";
  item.style.color = "gray";
  item.textContent = msg;
  messages.appendChild(item);
});
