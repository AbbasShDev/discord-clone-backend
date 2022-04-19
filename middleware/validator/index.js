const validator = require("express-joi-validation").createValidator({});

//auth validators
const loginValidator = validator.body(require("./schemas/loginSchema"));
const registerValidator = validator.body(require("./schemas/registerSchema"));
const sendFriendInvitationValidator = validator.body(
  require("./schemas/sendFriendInvitationSchema")
);
const acceptriendInvitationValidator = validator.body(
  require("./schemas/acceptFriendInvitationSchema")
);
const rejectFriendInvitationValidator = validator.body(
  require("./schemas/rejectFriendInvitationSchema")
);

module.exports = {
  loginValidator,
  registerValidator,
  sendFriendInvitationValidator,
  acceptriendInvitationValidator,
  rejectFriendInvitationValidator,
};
