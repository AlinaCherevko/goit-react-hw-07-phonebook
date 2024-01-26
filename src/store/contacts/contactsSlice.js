import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getContacts, postContact, removeContact } from 'servises/api';

const initialState = {
  contacts: [],
  contactData: [],
  status: 'idle',
  isLoading: false,
  error: null,
};
export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await getContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiPostContact = createAsyncThunk(
  'contacts/apiPostContact',
  async (formData, thunkApi) => {
    try {
      const contact = await postContact(formData);
      return contact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiDeleteContact = createAsyncThunk(
  'contacts/apiDeleteContact',
  async (id, thunkApi) => {
    try {
      const contact = await removeContact(id);
      return contact;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт екстраредюсерів

  extraReducers: builder =>
    builder

      //Get Contact
      .addCase(apiGetContacts.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.status = 'success';
        state.contacts = action.payload;
      })
      .addCase(apiGetContacts.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      //Post Contact
      .addCase(apiPostContact.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(apiPostContact.fulfilled, (state, action) => {
        state.status = 'success';
        state.contacts.push(action.payload);
      })
      .addCase(apiPostContact.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })

      //Delete Contact
      .addCase(apiDeleteContact.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(apiDeleteContact.fulfilled, (state, action) => {
        state.status = 'success';
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(apiDeleteContact.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      }),
});

// Генератори екшенів
// export const { addContact, deleteContact, filterContact } =
//   contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
