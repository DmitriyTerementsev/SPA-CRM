import PopupWithForm from '../PopupWithForm';
import styles from '../PopupWithForm.module.scss';
import React, { useEffect, useState } from 'react';
import { ReactComponent as TrashButton } from '../../../assets/icons/trashButton.svg';
import { Item } from '../../Promocode/Promocode';
import PromocodesStore from '../../../store/PromocodesStore';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Item;
  handleDeleteItem: (id: string) => void;
}

function PopupOrders({
  isOpen,
  onClose,
  selectedItem,
  handleDeleteItem,
}: PopupProps) {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputSale, setInputSale] = useState(0 + ' %');

  useEffect(() => {
    if (selectedItem) {
      setInputTitle(selectedItem.name);
      setInputDescription(selectedItem.promocode);
      setInputSale(String(selectedItem.percent + ' %'));
    }
  }, [selectedItem]);

  const handleEditClick = async (e: React.FormEvent<HTMLFormElement>) => {
    if (selectedItem.id === '') {
      e.preventDefault();
      let id = String(Math.floor(Math.random() * 10000) + 1);
      await PromocodesStore.addPromocode({
        id: id,
        name: inputTitle,
        promocode: inputDescription,
        percent: inputSale,
      });
      onClose();
    } else {
      e.preventDefault();
      await PromocodesStore.editPromocode({
        id: selectedItem.id,
        name: inputTitle,
        promocode: inputDescription,
        percent: inputSale,
      });
    }
    onClose();
  };

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className={styles.popup__container}>
        <form className={styles.form} onSubmit={(e) => handleEditClick(e)}>
          <div className={styles.popup__buttons}>
            <button
              type='button'
              className={styles.popup__button}
              onClick={() => handleDeleteItem(selectedItem.id)}
            >
              Удалить
            </button>
            <button
              type='submit'
              className={`${styles.popup__button} ${styles.popup__button_submit}`}
            >
              Сохранить
            </button>
          </div>
          <div className={styles.form__container}>
            <p className={styles.form__label}>Заголовок</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Заголовок'
              value={inputTitle || ''}
              onChange={(e) => setInputTitle(e.target.value)}
              required
            />
            <p className={styles.form__label}>Промокод</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Краткое описание'
              required
              value={inputDescription || ''}
              onChange={(e) => setInputDescription(e.target.value)}
            />
            <p className={styles.form__label}>Процент скидки</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Процент скидки'
              required
              value={inputSale || ''}
              onChange={(e) => setInputSale(e.target.value)}
            />
            <div className={styles.order}>
              <p className={styles.order__title}>Товары</p>
              <div className={styles.order__item}>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>
                    Биостимулирующий дневной крем
                  </p>
                  <p className={styles.order__name}>Kosmoteros</p>
                  <TrashButton />
                </div>
              </div>
              <div className={styles.order__item}>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>
                    Биостимулирующий дневной крем
                  </p>
                  <p className={styles.order__name}>Kosmoteros</p>
                  <TrashButton />
                </div>
              </div>
              <div className={styles.order__item}>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>
                    Биостимулирующий дневной крем
                  </p>
                  <p className={styles.order__name}>Kosmoteros</p>
                  <TrashButton />
                </div>
              </div>
              <div className={styles.order__item}>
                <div className={styles.order__text}>
                  <p className={styles.order__name}>
                    Биостимулирующий дневной крем
                  </p>
                  <p className={styles.order__name}>Kosmoteros</p>
                  <TrashButton />
                </div>
              </div>
              <div className={styles.order__text}>
                <TrashButton className={styles.form__delete} />
              </div>
            </div>
            <button
              type='button'
              className={`${styles.popup__button} ${styles.popup__button_edit}`}
            >
              + Добавить товар
            </button>
          </div>
        </form>
      </div>
    </PopupWithForm>
  );
}

export default PopupOrders;
