import React, { useState, useEffect } from 'react';
import { Container } from './app.styled';
import { ContactsForm } from './Form';
import { ContactsList } from './Contacts';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    ...JSON.parse(localStorage.getItem(CONTACTS_KEY)),
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    console.log(contacts);
  }, [contacts]);

  const addNewContact = e => {
    console.log(contacts);
    if (
      contacts.find(contact => {
        return contact.name === e.name;
      })
    ) {
      return alert(`${e.name} is already in contacts`);
    }
    setContacts(prevState => [
      ...prevState,
      { name: e.name, number: e.number },
    ]);
  };

  const handleSubmit = e => {
    addNewContact(e);
  };

  const handleChange = e => {
    console.log(contacts);
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };

  const filterContactsList = () => {
    console.log(contacts);
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  const handleDelete = name => {
    console.log(contacts);
    const remainingContacts = contacts.filter(contact => contact.name !== name);
    setContacts([...remainingContacts]);
  };

  return (
    <Container>
      <ContactsForm handleSubmit={handleSubmit} />
      <ContactsList
        contacts={filterContactsList()}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
    </Container>
  );
};
