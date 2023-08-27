import React, { useState, useEffect } from 'react';
import { Container } from './app.styled';
import { ContactsForm } from './Form';
import { ContactsList } from './Contacts';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts([...JSON.parse(localStorage.getItem(CONTACTS_KEY))]);
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const addNewContact = e => {
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
    const value = e.target.value.toLowerCase();
    setFilter(value);
  };

  const filterContactsList = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  const handleDelete = name => {
    const remainingContacts = contacts.filter(contact => contact.name !== name);
    setContacts([...remainingContacts]);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(remainingContacts));
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
