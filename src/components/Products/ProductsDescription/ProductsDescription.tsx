import TableDescription from '../../Table/TableDescription/TableDescription';
import React from 'react';
import styles from '../../Table/TableDescription/TableDescription.module.scss';

function ProductsDescription() {
  return (
    <TableDescription>
      <>
        {/* <input
        type='checkbox'
        className={styles.description__checkbox}
      /> */}
        <p className={`${styles.description__item}`}>Название</p>
        <p
          className={`${styles.description__item} ${styles.description__item_article}`}
        >
          Артикул
        </p>
      </>
    </TableDescription>
  );
}

export default ProductsDescription;
