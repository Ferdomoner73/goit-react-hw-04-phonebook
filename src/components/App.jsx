import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container } from './app.styled';
import { ContactsForm } from './Form';
import { ContactsList } from './Contacts';

const INITITAL_VALUES = {
  contacts: [
    { name: 'Rosie Simpson', number: '459-12-56' },
    { name: 'Hermione Kline', number: '443-89-12' },
    { name: 'Eden Clements', number: '645-17-79' },
    { name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    ...INITITAL_VALUES,
  };

  componentDidMount() {
    const storegedContacts = localStorage.getItem(CONTACTS_KEY);
    const parsedContacts = JSON.parse(storegedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    }
  }

  addNewContact = e => {
    if (
      this.state.contacts.find(contact => {
        return contact.name === e.name;
      })
    ) {
      return alert(`${e.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name: e.name, number: e.number }],
    }));
  };

  handleSubmit = e => {
    this.addNewContact(e);
  };

  handleChange = e => {
    const value = e.target.value.toLowerCase();
    this.setState({
      filter: value,
    });
  };

  filterContactsList = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter)
    );
  };

  handleDelete = name => {
    const remainingContacts = this.state.contacts.filter(
      contact => contact.name !== name
    );
    this.setState({ contacts: [...remainingContacts] });
  };

  render() {
    return (
      <Container>
        <ContactsForm handleSubmit={this.handleSubmit} />
        <ContactsList
          contacts={this.filterContactsList()}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
        />
      </Container>
    );
  }
}

App.propTypes = {
  INITITAL_VALUES: PropTypes.shape({
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  }),
};
