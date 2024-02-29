import React from 'react';
import TableDescription from '../TableDescription/TableDescription.tsx';
import styles from '../TableDescription/TableDescription.module.scss'

function OrderDescription() {
  return (
    <TableDescription>
      <p className={`${styles.description__item} ${styles.description__item_order}`}>Покупатель</p>
      <p className={`${styles.description__item} ${styles.description__item_order}`}>Номер заказа</p>
      <p className={`${styles.description__item} ${styles.description__item_order}`}>Способ получения</p>
      <p className={`${styles.description__item} ${styles.description__item_date}`}>Дата оформления</p>
      <p className={`${styles.description__item} ${styles.description__item_sum}`}>Сумма заказа</p>
      <p className={`${styles.description__item} ${styles.description__item_sum}`}>Оплачено</p>
    </TableDescription>
  );
}

export default OrderDescription;
