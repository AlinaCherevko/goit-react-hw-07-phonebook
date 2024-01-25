import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'store/contacts/contactsSlice';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.contacts);

  const [userName, setUserName] = useState('');
  const [userNumber, setUserNumber] = useState('');

  const addNewName = formData => {
    const avoidRepitition = contacts.some(
      contact => contact.userName === formData.userName
    );
    if (avoidRepitition) {
      alert(`${formData.userName} is already exist!`);
      return;
    }

    const finalProfile = {
      ...formData,
      id: nanoid(),
    };
    const action = addContact(finalProfile);
    dispatch(action);
  };
  const formSubmit = e => {
    e.preventDefault();

    const formData = {
      userName,
      userNumber,
      id: nanoid(),
    };
    // console.log(formData);
    addNewName(formData);

    //контрольовано очищуємо вміст форми:
    setUserName('');
    setUserNumber('');

    //очищуємо неконтрольовану форму:
    // e.currentTarget.reset();
  };
  //Напишимо метод що контролює поля форм і змінює стан:
  const onChangeInputForm = ({ target: { name, value } }) => {
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'userNumber':
        setUserNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Add new contact</h1>
      <form className={css.form} onSubmit={formSubmit}>
        <div className={css.divWrapper}>
          <label htmlFor="" className={css.label}>
            Name
          </label>
          <input
            onChange={onChangeInputForm}
            value={userName}
            type="text"
            name="userName"
            className={css.input}
            required
          />
        </div>
        <div className={css.divWrapper}>
          <label htmlFor="" className={css.label}>
            Number
          </label>
          <input
            onChange={onChangeInputForm}
            value={userNumber}
            type="text"
            name="userNumber"
            className={css.input}
            required
          />
        </div>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
