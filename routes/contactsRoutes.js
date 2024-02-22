const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsControllers");
const validateBody = require("../helpers/validateBody");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

// They are bouth working
router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getOneContact);
// Also working
router.post(
  "/",
  validateBody(createContactSchema),
  contactsController.createContact
);
//This is also working
router.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsController.updateContact
);
// Also working
router.delete("/:id", contactsController.deleteContact);

// Working
router.patch("/:id/favorite", contactsController.updateStatusContacts);

module.exports = router;
