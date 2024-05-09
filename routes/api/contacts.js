const express = require("express");

const {
  getContactsList,
  getContactById,
  addNewContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contacts");

const contactsRouter = express.Router();

const {  isValidId, authenticate } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../../models/joiSchemas");

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

contactsRouter.use(authenticate);

contactsRouter.get("/", getContactsList);

contactsRouter.get("/:id", isValidId, getContactById);

contactsRouter.post("/", contactAddValidate, addNewContact);

contactsRouter.delete("/:id", isValidId, removeContactById);

contactsRouter.put(
  "/:id",
  isValidId,
  contactAddValidate,
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  updateStatusContact
);

module.exports = contactsRouter;