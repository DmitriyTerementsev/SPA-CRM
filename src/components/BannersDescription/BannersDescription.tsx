import React from 'react';
import TableDescription from '../TableDescription/TableDescription.tsx';
import styles from '../TableDescription/TableDescription.module.scss';

function BannersDescription() {
  return (
    <TableDescription>
      <p
        className={`${styles.description__item} ${styles.description__item_city}`}
      >
        Заголовок
      </p>
    </TableDescription>
  );
}

export default BannersDescription;
