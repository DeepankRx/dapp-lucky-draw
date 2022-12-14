import React from 'react';
import styles from './Card.module.css';
import moment from 'moment'
const Card = ({ user }) => {
  return (
    <div className={styles.account_modal}>
      <div className={styles.account_modal_content}>
        <h1 className={styles.h1}>Profile</h1>
        <span>Name</span>
        <input
          className={styles.modal_input}
          type="text"
          placeholder="Name"
          value={user?.name}
          readOnly
        />
        <span>Phone Number</span>
        <input
          className={styles.modal_input}
          type="number"
          placeholder="Phone Number"
          value={user?.phoneNumber}
          readOnly
        />
        <span>Email</span>
        <input
          className={styles.modal_input}
          type="text"
          placeholder="Email"
          value={user?.email}
          readOnly
        />
        <span>Address</span>
        <input
          className={styles.modal_input}
          type="text"
          placeholder="Address"
          value={user?.address}
          readOnly
        />
        <span>Wallet Address</span>
        <input
          className={styles.modal_input}
          type="text"
          placeholder="Wallet Address"
          value={user?.walletAddress}
          readOnly
        />
        <span>Prize</span>
        <input
          className={styles.modal_input}
          type="text"
          placeholder="Wallet Address"
          value={user?.prizeAmount + ' Ether'}
          readOnly
        />
        <span>Won Date</span>
        <input
          className={styles.modal_input}
          type="text"
          placeholder="Wallet Address"
          value={moment(user.time).format("DD/MM/YYYY - HH:MM:SS")}
          readOnly
        />
      </div>
    </div>
  );
};

export default Card;
