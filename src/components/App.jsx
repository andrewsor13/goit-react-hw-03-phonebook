import React, { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import styles from './App.module.css';
import '../index.css';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const data = {
    contacts: initialContacts,
    filter: '',
    name: '',
    number: '',
    divHeight: 300,
  };
  const [state, setState] = useState(data);

  if (state.contacts.length > 4) {
    setState({ divHeight: state.contacts.length * 60 });
  }

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setState(prevState => ({
        ...prevState,
        contacts: JSON.parse(storedContacts),
      }));
    } else {
      setState({ contacts: JSON.parse(storedContacts) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleAddContact = newContact => {
    const isNameAlreadyExist = state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isNameAlreadyExist) {
      alert(`Contact with the name '${newContact.name}' already exists.`);
    } else {
      setState(prevState => ({
        ...prevState,
        contacts: [...prevState.contacts, newContact],
        divHeight: state.divHeight + 60,
      }));
    }
  };

  const handleDeleteContact = contactId => {
    const updatedContacts = state.contacts.filter(
      contact => contact.id !== contactId
    );
    setState({
      ...state,
      contacts: updatedContacts,
      divHeight: state.divHeight - 60,
    });
  };

  return (
    <div className="App">
      <div className={styles.phonebook}>
        <h1 className={styles.phonebook_title}>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
      </div>

      <div
        className={styles.contacts}
        style={{ height: `${state.divHeight}px` }}
      >
        <h2 className={styles.contacts_title}>Contacts</h2>
        <Filter
          value={state.filter}
          onChange={value => setState({ ...state, filter: value })}
        />

        <ContactList
          contacts={state.contacts}
          filter={state.filter}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}
// * end Apps
