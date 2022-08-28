import { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import Form from './Form/Form';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const removeContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const addContact = items => {
    if (isDublicate(items)) {
      return alert(`${items.name}: ${items.number} is already in contacts`);
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...items,
      };
      return [...prevContacts, newContact];
    });
  };

  const isDublicate = ({ name, number }) => {
    const result = contacts.find(
      item =>
        item.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
        item.number === number
    );
    return Boolean(result);
  };

  const getFiltredContact = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) || number.includes(filter);
      return result;
    });
    return filteredContacts;
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const filtredContacts = getFiltredContact();
  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />

      <Filter onChange={handleFilter} />

      <h2>Contacts</h2>
      <ContactList contacts={filtredContacts} removeContact={removeContact} />
    </>
  );
};

export default App;
