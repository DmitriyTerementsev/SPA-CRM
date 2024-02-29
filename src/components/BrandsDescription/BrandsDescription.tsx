import React from 'react';
import styles from '../Actions/Actions.module.scss';

function BrandsDescription() {
  return (
    <div
      className={
        `${styles.actions__description} ${styles.actions__description_brand}`
      }
    >
      <p className={`${styles.actions__text} ${styles.actions__text_logo}`}>Логотип бренда</p>
      <p className={`${styles.actions__text} ${styles.actions__text_brands}`}>Название бренда</p>
    </div>
  );
}

export default BrandsDescription;
