import React from 'react';
import css from './ContactList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'store/contacts/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(store => store.filter.filter);
  const contacts = useSelector(store => store.contacts.contacts);

  //шукаємо підрядок у рядку, далі ми передамо цей об,єкт у рендер
  const filteredContact = contacts.filter(user =>
    user.userName.toLowerCase().includes(filter.trim().toLowerCase())
  );
  return (
    <ul className={css.listWrapper}>
      {filteredContact.map(user => (
        <li key={user.id} className={css.wrapper}>
          <p className={css.description}>
            {user.userName}: {user.userNumber}
          </p>
          <button
            className={css.button}
            onClick={() => dispatch(deleteContact(user.id))}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
