import React from 'react';
import Registration from './Registration';
import { useSelector, useDispatch } from 'react-redux';
import { toggleForm, toggleFormType } from 'redux/user/userSlice';

import styles from '../../styles/User.module.css';
import Login from './Login';

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  const onClose = () => {
    dispatch(toggleForm(false));
  };

  const currentFormType = (type)=> dispatch(toggleFormType(type));
  return showForm ? (
    <>
      <div className={styles.overlay} onClick={onClose} />
      {formType === 'signup' ? <Registration currentFormType={currentFormType} /> : <Login currentFormType={currentFormType}/>}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
