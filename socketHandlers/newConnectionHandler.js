const serverStore = require("../serverStore");
const { updateFriendsPendingInvitations } = require("./friends/invitaions.js");

const newConnectionHandler = (socket, io) => {
  serverStore.addNewConnectedUser(socket.id, socket.user.id);

  updateFriendsPendingInvitations(socket.user.id);
};

module.exports = newConnectionHandler;
