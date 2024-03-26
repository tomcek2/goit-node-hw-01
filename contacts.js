const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return;
    }

    try {
      const contacts = JSON.parse(data);
      console.log("Kontakty:", contacts);
    } catch (parseError) {
      console.error("Błąd parsowania danych:", parseError);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return;
    }

    try {
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      if (contact) {
        console.log("Znaleziony kontakt:", contact);
      } else {
        console.log("Nie znaleziono kontaktu o podanym ID.");
      }
    } catch (parseError) {
      console.error("Błąd parsowania danych:", parseError);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return;
    }

    try {
      let contacts = JSON.parse(data);
      const updatedContacts = contacts.filter((c) => c.id !== contactId);
      if (contacts.length === updatedContacts.length) {
        console.log("Nie znaleziono kontaktu o podanym ID.");
        return;
      }
      fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Błąd zapisu pliku:", err);
            return;
          }
          console.log("Kontakt został usunięty.");
        }
      );
    } catch (parseError) {
      console.error("Błąd parsowania danych:", parseError);
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return;
    }

    try {
      let contacts = JSON.parse(data);
      const newContact = {
        id: uniqid(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Błąd zapisu pliku:", err);
            return;
          }
          console.log("Nowy kontakt został dodany.");
        }
      );
    } catch (parseError) {
      console.error("Błąd parsowania danych:", parseError);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// Math.random().toString(36).substr(2, 10), // Generowanie losowego ID
