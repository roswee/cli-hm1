const fs = require("fs").promises;
const path = require("path");

// path to contacts in root
const contactsPath = path.resolve(__dirname, "./db/contacts.json")

// function should returned JSON with contacts
function listContacts() {
  fs.readFile(contactsPath)
    .then((result) => console.table(JSON.parse(result)))
    .catch((err) => console.log(err));
}

// function should returned JSON with contact getted by ID
function getContactById(contactId) {
  fs
    .readFile(contactsPath)
    .then((data) => {
        const contact = JSON.parse(data);
        console.table(contact.filter(({ id }) => (id === contactId)));
    })
    .catch((err) => console.log(err));
  
}

// function to remove contact by ID and do not return any data
function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(({ id }) => id !== contactId);
      console.table(newContacts);
      fs.writeFile(contactsPath, JSON.stringify(newContacts))
        .then(console.log("done"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// function to add contact and do not return any data
function addContact(name, email, phone) {
  const newContact = {
    id: Date.now().toString(),
    name: name,
    email: email,
    phone: phone,
  };
  fs.readFile(contactsPath)
  .then((data) => {
    const parsedCont = JSON.parse(data);
    parsedCont.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(parsedCont))
      .then(() => console.log(`contact added`))
      .catch((err) => console.log(err));
  })
  .catch(err => console.log(err));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}