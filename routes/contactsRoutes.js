const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsControllers');
const  validateBody  = require('../helpers/validateBody');
const { createContactSchema, updateContactSchema } = require('../schemas/contactsSchemas');


router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getOneContact);

router.post("/", validateBody(createContactSchema), contactsController.createContact);

router.put("/:id", validateBody(updateContactSchema), contactsController.updateContact);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;