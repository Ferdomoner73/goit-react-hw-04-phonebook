import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { EachContact } from './EachContact';
import { Filter } from './Filter';
import {
  ContactsListContainer,
  ContactsListTitle,
  List,
} from './contacts.styled';

export const ContactsList = ({ contacts, handleChange, handleDelete }) => {
  console.log(contacts);

  return (
    <ContactsListContainer>
      <ContactsListTitle>Contacts</ContactsListTitle>
      <Filter handleChange={handleChange} />
      <List>
        {contacts.map(contact => (
          <EachContact
            key={nanoid(10)}
            contact={contact}
            handleDelete={handleDelete}
          />
        ))}
      </List>
    </ContactsListContainer>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
