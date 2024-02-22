const express = require("express");

const {
  getContactsList,
  getContactById,
  addNewContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
} = require("../controllers/contacts/index");

const contactsRouter = express.Router();

const { isEmptyBody, isValidId, authenticate } = require("../middlware/index");
const { validateBody } = require("../decoder/validateBody");
const {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} = require("../schemas/JoiSchemas/index");

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

contactsRouter.use(authenticate);

contactsRouter.get("/", getContactsList);

contactsRouter.get("/:id", isValidId, getContactById);

contactsRouter.post("/", isEmptyBody, contactAddValidate, addNewContact);

contactsRouter.delete("/:id", isValidId, removeContactById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  contactUpdateFavoriteValidate,
  updateStatusContact
);

module.exports = contactsRouter;