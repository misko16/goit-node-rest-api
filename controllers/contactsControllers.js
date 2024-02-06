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
        msg: "Not Found",
      });
    }
    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Not found",
    });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await contactsService.removeContact(id);
    if (!deleteContact) {
      res.status(404).json({
        msg: "Not Found",
      });
    }
    res.status(200).json(deleteContact);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      msg: "Not Found",
    });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactsService.addContact(name, email, phone);
    res.status(201).json(newContact);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json({
      msg: err.message,
    });
  }
};


exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
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
