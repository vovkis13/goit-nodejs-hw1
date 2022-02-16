const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (err) {
    return err.message;
  }
}

async function getContactById(contactId) {
  try {
    const foundContact = JSON.parse(await fs.readFile(contactsPath)).find(
      (contact) => contact.id === contactId
    );
    return foundContact || "Contact not found";
  } catch (err) {
    return err.message;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath)).filter(
      (contact) => contact.id !== contactId
    );

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    return err.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    contacts.push({ id: uuidv4(), name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    return err.message;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
