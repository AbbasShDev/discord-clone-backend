const User = require("../models/User");
const FriendsInvitation = require("../models/FriendsInvitation");
const {
  updateFriendsPendingInvitations,
} = require("../socketHandlers/friends/invitaions.js");

// @desc    send friend invitation
// @route   POST /api/friends-nvitations/invite
// @access  Private
const sendFriendInvitation = async (req, res) => {
  const { email: receiverEmail } = req.body;
  const { id, email: senderEmail } = req.user;

  try {
    if (receiverEmail.toLowerCase() === senderEmail.toLowerCase())
      return res
        .status(400)
        .json({ error: "You can not send invitaion to yourself." });

    const receiverUser = await User.findOne({ email: receiverEmail });

    if (!receiverUser)
      return res
        .status(404)
        .json({ error: "User with email address does not exist." });

    const invitaionAlreadySent = await FriendsInvitation.findOne({
      senderId: id,
      receiverId: receiverUser._id,
    });

    if (invitaionAlreadySent)
      return res.status(400).json({ error: "Invitaion is already sent." });

    const userIsAlreadyAFriend = receiverUser.friends.find(
      (friendId) => friendId.toString() === id.toString()
    );

    if (userIsAlreadyAFriend)
      return res.status(400).json({ error: "User is already your friend." });

    const newInvitation = await FriendsInvitation.create({
      senderId: id,
      receiverId: receiverUser._id,
    });

    //Send Invitaion in realtime
    updateFriendsPendingInvitations(receiverUser._id.toString());

    res.send();
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  sendFriendInvitation,
};
