const Joi = require("joi");

const acceptFriendInvitationSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = acceptFriendInvitationSchema;
