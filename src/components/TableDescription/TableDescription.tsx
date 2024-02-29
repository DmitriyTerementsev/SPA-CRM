import React from 'react';
import styles from './TableDescription.module.scss'

function TableDescription({children}) {
  return (
    <div
      className={
        `${styles.description}`
      }
    >
      {children}
    </div>
  );
}

export default TableDescription;
