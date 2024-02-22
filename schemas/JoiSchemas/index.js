const { userRegisterSchema, userLoginSchema } = require("./usersSchema");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("./contactsSchemas");

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  contactAddSchema,
  contactUpdateFavoriteSchema,
};
