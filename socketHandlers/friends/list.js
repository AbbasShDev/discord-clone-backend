const User = require("../../models/User");
const {
  getUserActiveConnection,
  getSocketServerInctance,
} = require("../../serverStore");

const updateFriendsList = async (userId) => {
  try {
    const receiverActiveConnection = getUserActiveConnection(userId);

    if (receiverActiveConnection.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username email"
      );

      if (user) {
        const friendsList = user.friends.map((f) => ({
          id: f._id,
          username: f.username,
          email: f.email,
          isOnline: false,
        }));

        let io = getSocketServerInctance();

        receiverActiveConnection.forEach((connection) => {
          friendsList.forEach((f, i) => {
            const friendActiveConnection = getUserActiveConnection(
              f.id.toString()
            );

            if (friendActiveConnection.length > 0) {
              friendsList[i].isOnline = true;
            }
          });

          io.to(connection).emit("update-friends-list", { friendsList });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateFriendsList,
};
