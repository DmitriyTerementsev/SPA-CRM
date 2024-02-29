import React from 'react';
import styles from '../Actions/Actions.module.scss';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/en-close.svg';

interface ActionsSelectedProps {
  closePopup: () => void;
  handleDeleteItem: () => void;
  isActive: boolean;
  counter: number;
}

function ActionsSelected({
  counter,
  handleDeleteItem,
  isActive,
  closePopup,
}: ActionsSelectedProps) {
  return (
    <div
      className={
        isActive
          ? styles.actions__select + ' ' + styles.actions__select_active
          : styles.actions__select
      }
    >
      <button className={styles.actions__close} onClick={closePopup}>
        <CloseIcon className={styles.actions__close} />
      </button>
      <p className={styles.select__text}>
        Количество выбранных позиций: {counter}
      </p>
      <button className={styles.actions__delete} onClick={handleDeleteItem}>
        <TrashIcon className={styles.actions__delete} />
        <p className={styles.delete__text}>Удалить</p>
      </button>
    </div>
  );
}

export default ActionsSelected;
