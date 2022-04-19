const express = require("express");
const router = express.Router();
const {
  sendFriendInvitation,
  acceptFriendInvitation,
  rejectFriendInvitation,
} = require("../controllers/friendsInvitationController");
const {
  sendFriendInvitationValidator,
  acceptriendInvitationValidator,
  rejectFriendInvitationValidator,
} = require("../middleware/validator");
const { auth } = require("../middleware/authMiddleware");

router.post(
  "/invite",
  auth,
  sendFriendInvitationValidator,
  sendFriendInvitation
);

router.post(
  "/accept",
  auth,
  acceptriendInvitationValidator,
  acceptFriendInvitation
);

router.post(
  "/reject",
  auth,
  rejectFriendInvitationValidator,
  rejectFriendInvitation
);

module.exports = router;
