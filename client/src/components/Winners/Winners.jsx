import React, { useEffect, useState } from 'react';
import styles from './Winners.module.css';
import Card from '../../UI/Card/Card';
import axios from 'axios';
import { toast } from 'react-toastify';
const Winners = () => {
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    const getWinners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/getAllWinners');
        setWinners(res.data.winners);
        toast.success(res.data.message);
      } catch (e) {
        toast.error(e.message);
      }
    };
    getWinners();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 className={styles.h1}>List Of Winners</h1>
      </div>
      <div>
        {winners.map((item) => {
          return <Card key={item._id} user={item} />;
        })}
      </div>
    </div>
  );
};

export default Winners;
