const User = require("../../models/User");
const FriendsInvitation = require("../../models/FriendsInvitation");
const {
  getUserActiveConnection,
  getSocketServerInctance,
} = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendsInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username email");

    const receiverActiveConnection = getUserActiveConnection(userId);

    let io = getSocketServerInctance();

    receiverActiveConnection.forEach((connection) => {
      io.to(connection).emit("friends-invitations", { pendingInvitations });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
};
