import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};
const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    addContact(state, action) {
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

// Генератори екшенів
export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
