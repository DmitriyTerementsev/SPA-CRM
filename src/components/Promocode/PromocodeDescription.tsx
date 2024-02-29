import React from 'react';
import TableDescription from '../Table/TableDescription/TableDescription';
import styles from '../Table/TableDescription/TableDescription.module.scss';

function PromocodeDescription() {
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

export default PromocodeDescription;
