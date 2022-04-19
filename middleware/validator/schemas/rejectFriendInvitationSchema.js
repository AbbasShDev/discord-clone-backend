const Joi = require("joi");

const rejectFriendInvitationSchema = Joi.object({
  id: Joi.string().required(),
});

module.exports = rejectFriendInvitationSchema;
