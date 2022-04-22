const serverStore = require("../serverStore");
const { updateOfflineFriends } = require("./friends/isOnline");

const disconnectHandler = (socket, io) => {
  serverStore.removeConnectedUser(socket.id);

  updateOfflineFriends(socket.user.id);
};

module.exports = disconnectHandler;
