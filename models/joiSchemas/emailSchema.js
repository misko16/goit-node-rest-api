const Joi = require("joi");

const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

module.exports = emailSchema;