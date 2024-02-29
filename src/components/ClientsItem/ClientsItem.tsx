import React from 'react';
import styles from '../Actions/Actions.module.scss';
interface ClientsItemProps {
  name: string;
  email: string;
  phone: string;
}

function ClientsItem({ name, email, phone }: ClientsItemProps) {
  return (
    <li className={styles.actions__item}>
      <p className={styles.actions__text}>{name}</p>
      <p className={styles.actions__text}>{email}</p>
      <p className={styles.actions__text}>{phone}</p>
    </li>
  );
}

export default ClientsItem;
