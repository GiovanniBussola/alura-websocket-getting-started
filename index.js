const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Alguém se conectou com o id: ", socket.id);
});

function generateValue() {
  return (Math.random() * 100).toFixed(2);
}

setInterval(() => {
  io.emit("cotação", generateValue());
}, 1000);

server.listen(3010, () => {
  console.log("startado");
});
