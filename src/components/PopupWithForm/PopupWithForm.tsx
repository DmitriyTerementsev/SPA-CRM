import styles from './PopupWithForm.module.scss';
import React, { useRef, useEffect } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

function PopupWithForm({ isOpen, onClose, children }: PopupProps) {
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
      {children}
    </div>
  );
}

export default PopupWithForm;
