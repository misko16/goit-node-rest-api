const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("./contactSchemas.js");

const { userRegisterSchema, userLoginSchema } = require("./userSchema.js");
const { emailSchema } = require('./emailSchema.js')

module.exports = {
  contactAddSchema,
  contactUpdateFavoriteSchema,
  userRegisterSchema,
  userLoginSchema,
  emailSchema
};
