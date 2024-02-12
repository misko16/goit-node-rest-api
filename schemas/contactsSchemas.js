const Joi = require('joi');

 const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(), 
    favorite: Joi.boolean().required(),
});

 const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

module.exports = {
    createContactSchema,
    updateContactSchema,
}