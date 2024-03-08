import { listContacts } from "./db/contacts.js";
import { getContactById } from "./db/contacts.js";
import { addContact } from "./db/contacts.js";
import { removeContact } from "./db/contacts.js";
import { program } from "commander";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
const invokeAction = async ({
    action,
    id,
    name,
    email,
    phone,
}) => {
    switch (action) {
        case "list":
            const listContact = await listContacts();
            return console.table(listContact);

        case "get":
            const contact = await getContactById(id);
            return console.log(contact);

        case "add":
            const newContact = await addContact(
                name,
                email,
                phone
            );
            return console.log(newContact);

        case "remove":
            const deleteContact = await removeContact(id);
            return console.log(deleteContact);

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
};

invokeAction(options);
