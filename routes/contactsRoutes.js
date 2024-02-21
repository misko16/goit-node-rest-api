const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsControllers");
const validateBody = require("../helpers/validateBody");
const {createContactSchema,updateContactSchema} = require("../schemas/contactsSchemas");
const { registerRequest, loginRequest, logOutRequest, getCurrentUser } = require("../controllers/authControllers");
const authMiddleware = require("../middlware/authMiddleware");


router.get("/", authMiddleware, contactsController.getAllContacts);
router.get("/:id", authMiddleware, contactsController.getOneContact);
router.post("/", authMiddleware, validateBody(createContactSchema), contactsController.createContact);
router.put("/:id", authMiddleware, validateBody(updateContactSchema), contactsController.updateContact);
router.delete("/:id", authMiddleware, contactsController.deleteContact);
router.patch('/:id/favorite', authMiddleware, contactsController.updateStatusContacts);

//NEW
router.post('/users/register', registerRequest);
router.post("/users/login", loginRequest);
router.post('/users/logout', authMiddleware, logOutRequest);
router.get('/users/current', authMiddleware, getCurrentUser);

module.exports = router;
