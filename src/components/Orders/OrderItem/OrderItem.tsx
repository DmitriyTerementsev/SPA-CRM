import React, { useEffect, useState } from 'react';
import styles from '../../Table/TableItem/TableItem.module.scss';
import TableItem from '../../Table/TableItem/TableItem.tsx';
import { Order } from '../../../interfaces/Order.ts';

interface OrderItemProps {
  delivery: string;
  summa: string;
  isPay: boolean;
  order: string;
  date: string;
  item: Order;
  openPopup: (item: Order) => void;
}

function OrderItem({
  order,
  delivery,
  date,
  summa,
  isPay,
  openPopup,
  item,
}: OrderItemProps) {
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
          {item.user !== undefined && item.user.name + ' ' + item.user.lastName}
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
