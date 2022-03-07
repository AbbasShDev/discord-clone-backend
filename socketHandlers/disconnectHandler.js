const serverStore = require("../serverStore");

const disconnectHandler = (socketId) => {
  serverStore.removeConnectedUser(socketId);
};

module.exports = disconnectHandler;
