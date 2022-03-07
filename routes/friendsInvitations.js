const express = require("express");
const router = express.Router();
const {
  sendFriendInvitation,
} = require("../controllers/friendsInvitationController");
const { sendFriendInvitationValidator } = require("../middleware/validator");
const { auth } = require("../middleware/authMiddleware");

router.post(
  "/invite",
  auth,
  sendFriendInvitationValidator,
  sendFriendInvitation
);

module.exports = router;
