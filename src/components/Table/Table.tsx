import React from 'react';
import styles from './Table.module.scss';
import { Routes, Route } from 'react-router-dom';
 import Protocols from '../Protocols/Protocols.tsx'
 import Banners from '../Banners/Banners.tsx'

function Table() {
  return (
    <div className={styles.table}>
      <div className={styles.table__container}>
        <Routes>
          <Route path='/banners' element={<Banners />} />

          <Route path='/protocols' element={<Protocols />} />
        </Routes>
      </div>
    </div>
  );
}

export default Table;
