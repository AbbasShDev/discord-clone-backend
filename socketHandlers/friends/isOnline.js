const User = require("../../models/User");
const {
  getUserActiveConnection,
  getSocketServerInctance,
} = require("../../serverStore");

const updateOnlineFriends = async (userId) => {
  try {
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      "friends",
      "_id username email"
    );

    if (user) {
      let io = getSocketServerInctance();

      user.friends.map((f) => {
        const receiverActiveConnection = getUserActiveConnection(
          f._id.toString()
        );

        if (receiverActiveConnection.length > 0) {
          receiverActiveConnection.forEach((connection) => {
            io.to(connection).emit("update-online-friends", {
              userId,
              sockerId: connection,
            });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateOfflineFriends = async (userId) => {
  try {
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      "friends",
      "_id username email"
    );

    if (user) {
      let io = getSocketServerInctance();

      user.friends.map((f) => {
        const receiverActiveConnection = getUserActiveConnection(
          f._id.toString()
        );

        const userActiveConnection = getUserActiveConnection(userId);

        if (
          receiverActiveConnection.length > 0 &&
          userActiveConnection.length === 0
        ) {
          receiverActiveConnection.forEach((connection) => {
            io.to(connection).emit("update-offline-friends", {
              userId,
              sockerId: connection,
            });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateOnlineFriends,
  updateOfflineFriends,
};
