const serverStore = require("../serverStore");
const { updateFriendsPendingInvitations } = require("./friends/invitaions");
const { updateFriendsList } = require("./friends/list");
const { updateOnlineFriends } = require("./friends/isOnline");

const newConnectionHandler = (socket, io) => {
  serverStore.addNewConnectedUser(socket.id, socket.user.id);

  updateFriendsPendingInvitations(socket.user.id);

  updateFriendsList(socket.user.id);

  updateOnlineFriends(socket.user.id);
};

module.exports = newConnectionHandler;
