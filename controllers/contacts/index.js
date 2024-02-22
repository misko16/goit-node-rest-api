const { getContactsList } = require("./listContacts");
const { getContactById } = require("./findById");
const { addNewContact } = require("./addContact");
const { removeContactById } = require("./deleteContact");
const { updateContactById } = require("./updateContact");
const { updateStatusContact } = require("./updateStatus");

module.exports = {
  getContactsList,
  getContactById,
  addNewContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
};
