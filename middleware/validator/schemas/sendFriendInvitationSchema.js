const Joi = require("joi");

const sendFriendInvitationSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = sendFriendInvitationSchema;
