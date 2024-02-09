const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "../db/contacts.json");
let cachedContacts = null;

async function listContacts() {
  try {
    if (!cachedContacts) {
      const data = await fs.readFile(contactsPath, "utf-8");
      cachedContacts = JSON.parse(data);
    }
    return cachedContacts;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    cachedContacts = updatedContacts;

    return contacts[index];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    // Замінюємо генерацію id через Date на UUID
    const newContact = { id: uuidv4(), name, email, phone };
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    cachedContacts = updatedContacts;
    return newContact;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateContact(contactId, updateData) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { ...contacts[index], ...updateData };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  updateContact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
