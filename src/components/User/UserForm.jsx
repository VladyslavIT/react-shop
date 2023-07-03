import React from 'react';
import Registration from './Registration';
import { useSelector, useDispatch } from 'react-redux';
import { toggleForm } from 'redux/user/userSlice';

import styles from '../../styles/User.module.css';

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm } = useSelector(({ user }) => user);

  const onClose = () => {
    dispatch(toggleForm(false));
  };
  return showForm ? (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <Registration />{' '}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
