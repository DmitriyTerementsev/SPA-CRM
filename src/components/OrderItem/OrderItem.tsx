import React, { useEffect, useState } from 'react';
import styles from '../TableItem/TableItem.module.scss';
import TableItem from '../TableItem/TableItem.tsx';

function OrderItem({ name, order, delivery, date, summa, isPay, openPopup, item }) {
  const [deliveryType, setDeliveryType] = useState('');
  const [isPayed, setIsPayed] = useState('');

  useEffect(() => {
    delivery === 'PICKUP'
      ? setDeliveryType('Самовывоз')
      : delivery === 'DELIVERY'
      ? setDeliveryType('Доставка')
      : setDeliveryType('');
  }, [delivery]);

  useEffect(() => {
    isPay === false ? setIsPayed('Нет') : setIsPayed('Да');
  }, [isPay]);

  return (
    <div
      onClick={() => {
        openPopup(item);
      }}
    >
      <TableItem>
        <p className={`${styles.item__text} ${styles.item__text_order}`}>
          {name}
        </p>
        <p className={`${styles.item__text} ${styles.item__text_order}`}>
          {order}
        </p>
        <p className={`${styles.item__text} ${styles.item__text_order}`}>
          {deliveryType}
        </p>
        <p className={`${styles.item__text} ${styles.item__text_date}`}>
          {date}
        </p>
        <p className={`${styles.item__text} ${styles.item__text_sum}`}>
          {summa}
        </p>
        <p className={`${styles.item__text} ${styles.item__text_sum}`}>
          {isPayed}
        </p>
      </TableItem>
    </div>
  );
}

export default OrderItem;
