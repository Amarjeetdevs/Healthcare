const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const PORT = 4000;

// Set up CORS for Express routes
app.use(cors());

// Create a Socket.IO server and pass the http server to it
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust to match your client's URL
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data) => {
    // Broadcast the message to all connected clients
    io.emit("messageResponse", data);
  });

  socket.on("typing", (data) => {
    // Broadcast the typing event to all clients except the sender
    socket.broadcast.emit("typingResponse", data);
  });

  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
  });
});

// Example route for Express
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// Start the combined server
server.listen(PORT, () => {
  console.log(`Chat app running on port ${PORT}`);
});
