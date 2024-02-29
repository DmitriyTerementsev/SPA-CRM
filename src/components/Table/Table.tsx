import React from 'react';
import styles from './Table.module.scss';
import { Routes, Route } from 'react-router-dom';
import Orders from '../Orders/Orders.tsx';
import Cities from '../Cities/Cities.tsx';

function Table() {
  return (
    <div className={styles.table}>
      <div className={styles.table__container}>
        <Routes>
          <Route path='/orders' element={<Orders />} />

          <Route path='/cities' element={<Cities />} />
        </Routes>
      </div>
    </div>
  );
}

export default Table;
