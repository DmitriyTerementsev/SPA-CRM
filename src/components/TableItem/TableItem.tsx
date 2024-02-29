import React from 'react';
import styles from './TableItem.module.scss';

function TableItem({ children }) {
  return <li className={styles.item}>{children}</li>;
}

export default TableItem;
