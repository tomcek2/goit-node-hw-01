const fs = require("fs").promises;
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.log("Kontakty:", contacts);
  } catch (err) {
    console.error("Błąd odczytu pliku:", err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.log("Znaleziony kontakt:", contact);
    } else {
      console.log("Nie znaleziono kontaktu o podanym ID.");
    }
  } catch (err) {
    console.error("Błąd odczytu pliku:", err);
  }
}

async function removeContact(contactId) {
  try {
    let data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    if (contacts.length === updatedContacts.length) {
      console.log("Nie znaleziono kontaktu o podanym ID.");
      return;
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf8"
    );
    console.log("Kontakt został usunięty.");
  } catch (err) {
    console.error("Błąd operacji na pliku:", err);
  }
}

async function addContact(name, email, phone) {
  try {
    let data = await fs.readFile(contactsPath, "utf8");
    let contacts = JSON.parse(data);
    const newContact = {
      id: uniqid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
    console.log("Nowy kontakt został dodany.");
  } catch (err) {
    console.error("Błąd operacji na pliku:", err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
