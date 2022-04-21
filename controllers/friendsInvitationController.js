const User = require("../models/User");
const FriendsInvitation = require("../models/FriendsInvitation");
const {
  updateFriendsPendingInvitations,
} = require("../socketHandlers/friends/invitaions");
const { updateFriendsList } = require("../socketHandlers/friends/list");

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

// @desc    accept friend invitation
// @route   POST /api/friends-nvitations/accept
// @access  Private
const acceptFriendInvitation = async (req, res) => {
  const { id } = req.body;
  const { id: userId } = req.user;

  try {
    const invitation = await FriendsInvitation.findById(id);

    if (!invitation) {
      return res.status(404).json({ error: "Invitation does not exist." });
    }

    const { senderId, receiverId } = invitation;

    const senderUser = await User.findById(senderId);
    if (!senderUser) {
      return res.status(404).json({ error: "Sender not found." });
    }
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    if (!receiverUser) {
      return res.status(404).json({ error: "Sender not found." });
    }
    receiverUser.friends = [...receiverUser.friends, senderId];

    await invitation.delete();

    await senderUser.save();
    await receiverUser.save();

    //Update Invitaions in realtime
    updateFriendsPendingInvitations(userId.toString());

    //Update Invitaions in realtime
    updateFriendsList(senderId.toString());
    updateFriendsList(receiverId.toString());

    res.send("Invitaion successfully accepted.");
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// @desc    reject friend invitation
// @route   POST /api/friends-nvitations/reject
// @access  Private
const rejectFriendInvitation = async (req, res) => {
  const { id } = req.body;
  const { id: userId } = req.user;

  try {
    const invitationExist = await FriendsInvitation.exists({ _id: id });

    if (!invitationExist) {
      return res.status(404).json({ error: "Invitation does not exist." });
    }

    await FriendsInvitation.findByIdAndDelete(id);

    //Update Invitaions in realtime
    updateFriendsPendingInvitations(userId.toString());

    res.send("Invitaion successfully rejected.");
  } catch (e) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  sendFriendInvitation,
  acceptFriendInvitation,
  rejectFriendInvitation,
};
