const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log("--- Lista kontaktów ---");
      listContacts();
      break;

    case "get":
      if (!id) {
        console.error("Brak ID. Użyj -i lub --id, aby podać ID użytkownika.");
        return;
      }
      console.log("--- Pobieranie kontaktu po ID ---");
      getContactById(id);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.error(
          "Brak wymaganych danych. Upewnij się, że podano nazwę, email i telefon użytkownika."
        );
        return;
      }
      console.log("--- Dodawanie nowego kontaktu ---");
      addContact(name, email, phone);
      break;

    case "remove":
      if (!id) {
        console.error(
          "Brak ID. Użyj -i lub --id, aby podać ID użytkownika do usunięcia."
        );
        return;
      }
      console.log("--- Usuwanie kontaktu po ID ---");
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Nieznany typ akcji!");
  }
}

invokeAction(argv);
