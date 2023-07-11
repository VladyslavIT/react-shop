import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, toggleForm } from 'redux/user/userSlice';

import styles from '../../styles/User.module.css';

const Login = ({currentFormType}) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const onClose = () => {
    dispatch(toggleForm(false));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const isNotEmpty = Object.values(values).every(value => value);

    if (!isNotEmpty) return;

    dispatch(loginUser(values));
    onClose();
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={onClose}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Login</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div
          className={styles.link}
          onClick={() => currentFormType("signup")}
        >
          Create an account
        </div>

        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
