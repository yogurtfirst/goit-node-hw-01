const {readFile, writeFile} = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
    const contacts = await readFile(contactsPath);
    if (contacts) return JSON.parse(contacts);
};
  
async function getContactById(contactId) {
    const contacts = await listContacts();
    const searchContact = contacts.find((item) => item.id === contactId);
    return searchContact || null;
};
  
async function removeContact(contactId) {
    const deletedContact = getContactById(contactId);
    if (deletedContact) {
        const contacts = await listContacts();
        const updatedContacts = contacts.filter((item) => item.id !== contactId);
        await writeFile(contactsPath, JSON.stringify(updatedContacts));
        return deletedContact;
    } else {
        return null;
    }
};
  
async function addContact(name, email, phone) {
    const newContact = {
        id: uuid(),
        name,
        email,
        phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
};

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }