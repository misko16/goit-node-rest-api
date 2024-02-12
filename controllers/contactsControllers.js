const {
  updateContactSchema,
} = require("../schemas/contactsSchemas");
const { User } = require("../models/userModel");



exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await User.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await User.findById(id);

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
    const deletedContact = await User.findByIdAndDelete(id);
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
    const newUser = await User.create(req.body);
    res.status(201).json({ msg: "successful", user: newUser });
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

    const updatedContact = await User.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStatusContacts = async (req, res) => {
  try {
    const { id } = req.params; // Зміни з contactId на id
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedContact = await User.findByIdAndUpdate(id, { favorite: req.body.favorite }, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    
    res.status(200).json(updatedContact);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Server error" }); 
  }
};
