const serverStore = require("../serverStore");

const newConnectionHandler = (socket, io) => {
  serverStore.addNewConnectedUser(socket.id, socket.user.id);
};

module.exports = newConnectionHandler;
