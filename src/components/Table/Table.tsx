import React from 'react';
import styles from './Table.module.scss';
import { Routes, Route } from 'react-router-dom';
import Products from '../Products/Products.tsx';
import Clients from '../Clients/Clients.tsx';
import Categories from '../Categories/Categories.tsx';
import Brands from '../Brands/Brands.tsx';
import Orders from '../Orders/Orders.tsx';

function Table() {
  return (
    <div className={styles.table}>
      <div className={styles.table__container}>
        <Routes>
          <Route path='/products' element={<Products />} />

          <Route path='/clients' element={<Clients />} />

          <Route path='/categories' element={<Categories />} />

          <Route path='/brands' element={<Brands />} />

          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default Table;
