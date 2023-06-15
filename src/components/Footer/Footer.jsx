import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/Footer.module.css';
import { ROUTES } from 'pages/routes';

import logo from '../../images/logo.svg';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.log}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className={styles.rights}>
        Develop by{' '}
        <a
          href="https://github.com/VladyslavIT"
          target="_blank"
          rel="noreferrer"
        >
          Vladyslav Chornyi
        </a>
      </div>

      <div className={styles.socials}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>

        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
