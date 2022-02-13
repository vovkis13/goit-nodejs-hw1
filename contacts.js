const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    console.table(JSON.parse(contacts.toString()));
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    let contacts = await fs.readFile(contactsPath);
    contacts = JSON.parse(contacts.toString());
    const foundContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    foundContact
      ? console.table(foundContact)
      : console.log("Contact not found");
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  let contacts;
  try {
    contacts = await fs.readFile(contactsPath);
    contacts = JSON.parse(contacts.toString()).filter(
      (contact) => contact.id !== contactId
    );
  } catch (err) {
    console.log(err.message);
  }
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  let contacts;
  try {
    contacts = await fs.readFile(contactsPath);
    contacts = JSON.parse(contacts.toString());
    const maxId = contacts.reduce((max, contact) => {
      if (Number(contact.id) > max) max = contact.id;
      return max;
    }, 0);
    const id = String(Number(maxId) + 1);
    contacts.push({id, name, email, phone });
  } catch (err) {
    console.log(err.message);
  }
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added");
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
