import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Link to="/">
          <div className={styles.logo}>
            <h1>Lucky Draw</h1>
          </div>
        </Link>
      </div>
      <div className={styles.nav_container}>
        <ul>
          {/* <li>
            <a href="/players/#buyticket">Buy Ticket</a>
          </li> */}
          <li>
            <Link to="/manager">Manager</Link>
          </li>
          <li>
            <Link to="/players">Players</Link>
          </li>
          <li>
            <Link to="/winners">Winners</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
