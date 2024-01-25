import React from 'react';
import { useDispatch } from 'react-redux';
import { filterContact } from 'store/filter/filterSlice';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.divWrapper}>
      <label className={css.label}>Find contact by name</label>
      <input
        type="text"
        onChange={e => dispatch(filterContact(e.currentTarget.value))}
        className={css.input}
        // value={value}
        placeholder=""
      />
    </div>
  );
};
