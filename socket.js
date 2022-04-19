const socket = require("socket.io");
const verifySocketToken = require("./middleware/authSocketMiddleware");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const { setSocketServerInctance } = require("./serverStore");

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

  setSocketServerInctance(io);

  io.on("connection", (socket) => {
    newConnectionHandler(socket, io);

    socket.on("disconnect", () => {
      disconnectHandler(socket.id);
    });
  });
};

module.exports = {
  registerSocketServer,
};
