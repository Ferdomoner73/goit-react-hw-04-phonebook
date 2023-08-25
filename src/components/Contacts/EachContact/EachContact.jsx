import React from 'react';
import PropTypes from 'prop-types';
import { Item, Title, Button } from './eachContact.styled';

export const EachContact = ({ contact, handleDelete }) => {
  return (
    <Item>
      <Title>
        {contact.name}: {contact.number}
      </Title>
      <Button type="button" onClick={() => handleDelete(contact.name)}>
        Delete
      </Button>
    </Item>
  );
};

EachContact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  handleDelete: PropTypes.func.isRequired,
};
