import React from 'react';

import { ContactForm, ContactList, Filter } from '../components';

import css from './App.module.css';

export const App = () => {
  return (
    <div className="container">
      <ContactForm />
      <h2 className={css.contactsTitle}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};
