const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(1).required(),
  password: Joi.string().min(5).required(),
});

module.exports = registerSchema;
