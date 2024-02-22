const { isEmptyBody } = require("./emptyBody");
const { isValidId } = require("./validId");
const { autenticate } = require("./authMiddleware");

module.exports = { isEmptyBody, isValidId, autenticate };
