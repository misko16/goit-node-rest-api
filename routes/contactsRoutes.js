const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsControllers');
const  validateBody  = require('../helpers/validateBody');
const { createContactSchema, updateContactSchema } = require('../schemas/contactsSchemas');


// Отримання всіх контактів
router.get("/", contactsController.getAllContacts);

// Отримання контакту за ID
router.get("/:id", contactsController.getOneContact);

// Створення нового контакту
router.post("/", validateBody(createContactSchema), contactsController.createContact);

// Оновлення контакту за ID
router.put("/:id", validateBody(updateContactSchema), contactsController.updateContact);

// Видалення контакту за ID
router.delete("/:id", contactsController.deleteContact);

module.exports = router;