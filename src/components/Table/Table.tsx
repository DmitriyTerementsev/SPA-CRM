import React from 'react';
import styles from './Table.module.scss'
import { Routes, Route } from 'react-router-dom';
import Products from '../Products/Products.tsx';
import Clients from '../Clients/Clients.tsx';
import Categories from '../Categories/Categories.tsx';

function Table() {
  return (
    <div className={styles.table}>
      <div className={styles.table__container}>
        <Routes>
          <Route path='/products' element={<Products/>} />
        </Routes>
        <Routes>
          <Route path='/clients' element={<Clients />} />
        </Routes>
        <Routes>
          <Route path='/categories' element={<Categories />} />
        </Routes>
      </div>
    </div>
  );
}

export default Table;
