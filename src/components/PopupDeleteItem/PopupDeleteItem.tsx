import styles from '../Popup/Popup.module.scss';
import React, { useRef, useEffect } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  handleDeleteItem: (id: number) => void;
  selectedBrand: any;
}

function PopupDeleteItem({
  isOpen,
  onClose,
  handleDeleteItem,
  selectedBrand,
}: PopupProps) {
  const rootEl: React.MutableRefObject<null> = useRef(null);
  const popup: React.MutableRefObject<null> = useRef(null);

  useEffect(() => {
    const onClick = (e: any) =>
      e.target.className === `${styles.popup} ${styles.popup_active}`
        ? onClose()
        : null;
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [onClose]);

  return (
    <div
      className={
        isOpen ? `${styles.popup} ${styles.popup_active}` : styles.popup
      }
      ref={popup}
    >
      <div
        className={`${styles.popup__container} ${styles.popup__container_delete}`}
        ref={rootEl}
      >
        <p className={styles.popup__title}>
          Вы действительно хотите удалить бренд
        </p>
        <p className={styles.popup__brand}>{selectedBrand.name}</p>
        <div
          className={`${styles.popup__buttons} ${styles.popup__buttons_delete}`}
        >
          <button
            className={`${styles.popup__button} ${styles.popup__button_confirm}`}
            onClick={() => handleDeleteItem(selectedBrand.id)}
          >
            Удалить
          </button>
          <button
            className={`${styles.popup__button} ${styles.popup__button_cancel}`}
            onClick={onClose}
          >
            Отменить удаление
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupDeleteItem;
