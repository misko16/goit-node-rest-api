const contactsService = require("../services/contactsServices");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Server error",
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await contactsService.removeContact(id);
    if (!deletedContact) {
      return res.status(404).json({  
        message: "Not Found",
      });
    }
    res.status(200).json(deletedContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};


exports.createContact = async (req, res) => {
  try {
    const { error, value } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Виправлення: передавати значення як окремі аргументи
    const newContact = await contactsService.addContact(value.name, value.email, value.phone);
    return res.status(201).json(newContact);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedContact = await contactsService.updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
