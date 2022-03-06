const socket = require("socket.io");
const verifySocketToken = require("./middleware/authSocketMiddleware");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");

const registerSocketServer = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    verifySocketToken(socket, next);
  });

  io.on("connection", (socket) => {
    newConnectionHandler(socket, io);
  });
};

module.exports = {
  registerSocketServer,
};
