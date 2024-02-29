import React from 'react';
import styles from '../Actions/Actions.module.scss';
interface ClientsDescriptionProps {
  description: React.MutableRefObject<null>;
}

function ClientsDescription({ description }: ClientsDescriptionProps) {
  return (
    <div
      className={
        `${styles.actions__description} ${styles.actions__description_clients}`
      }
      ref={description}
    >
      <p className={styles.actions__text}>ФИ</p>
      <p className={styles.actions__text}>Почта</p>
      <p className={styles.actions__text}>Телефон</p>
    </div>
  );
}

export default ClientsDescription;
