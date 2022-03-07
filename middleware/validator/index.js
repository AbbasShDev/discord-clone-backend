const validator = require("express-joi-validation").createValidator({});

//auth validators
const loginValidator = validator.body(require("./schemas/loginSchema"));
const registerValidator = validator.body(require("./schemas/registerSchema"));
const sendFriendInvitationValidator = validator.body(
  require("./schemas/sendFriendInvitationSchema")
);

module.exports = {
  loginValidator,
  registerValidator,
  sendFriendInvitationValidator,
};
