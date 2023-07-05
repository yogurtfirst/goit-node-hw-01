const { Command } = require('commander');

const {listContacts, getContactById, removeContact, addContact} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = await listContacts();
            console.log(contacts);
            break;

        case 'get':
            const getContact = await getContactById(id);
            console.log(getContact);
            break;

        case 'add':
            const newContact = await addContact(name, email, phone);
            console.log(newContact);
            break;

        case 'remove':
            const oldContact = await removeContact(id);
            console.log(oldContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);