import PopupWithForm from '../PopupWithForm/PopupWithForm.tsx';
import styles from '../PopupWithForm/PopupWithForm.module.scss';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Link } from '../../assets/icons/GDbanners.svg';
import { ReactComponent as TrashButton } from '../../assets/icons/trashButton.svg';
import {
  useEditBannersMutation,
  useAddBannersMutation,
} from '../../redux/Api/bannersApi.ts';
import { Item } from '../Banners/Banners.tsx';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: Item;
  handleDeleteItem: (id: string) => void;
  initialItem: Item
}

function PopupOrders({
  isOpen,
  onClose,
  selectedItem,
  handleDeleteItem,
}: PopupProps) {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputSale, setInputSale] = useState('');
  const [inputBanner, setInputBanner] = useState('');
  const [editBanner] = useEditBannersMutation();
  const [addBanners] = useAddBannersMutation();

  useEffect(() => {
    if (selectedItem !== null) {
      setInputTitle(selectedItem.name);
      setInputDescription(selectedItem.description);
      setInputBanner(selectedItem.image);
    }
  }, [selectedItem]);

  const handleEditClick = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    if (selectedItem.id !== '') {
      e.preventDefault();
      await editBanner({
        id,
        data: {
          ...selectedItem,
          name: inputTitle,
          description: inputDescription,
          image: inputBanner,
          sale: inputSale,
        },
      }).unwrap();
    } else {
      e.preventDefault();
      let id: string = String(Math.floor(Math.random() * 10000) + 1);
      await addBanners({
        name: inputTitle,
        description: inputDescription,
        image: inputBanner,
        sale: inputSale,
        id: id,
      });
    }
    onClose();
  };
console.log(selectedItem)
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className={styles.popup__container}>
        <form
          className={styles.form}
          onSubmit={(e) => handleEditClick(e, selectedItem.id)}
        >
          <div className={styles.popup__buttons}>
            <button
              type='button'
              className={styles.popup__button}
              onClick={() => {
                handleDeleteItem(selectedItem.id);
              }}
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
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              required
            />
            <p className={styles.form__label}>Краткое описание</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Краткое описание'
              required
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />
            <p className={styles.form__label}>Процент скидки</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Процент скидки'
              required
              value={inputSale}
              onChange={(e) => setInputSale(e.target.value)}
            />
            <div className={styles.form__input_upload}>
              <p className={styles.form__label}>Баннер</p>
              <input
                type='text'
                className={`${styles.form__input} ${styles.form__input_text}`}
                placeholder='Вставьте ссылку на Google Drive'
                required
                value={inputBanner}
                onChange={(e) => setInputBanner(e.target.value)}
              />
              <Link className={styles.form__icon} />
              <p className={styles.form__text}>
                Размер баннера 576x320 px PNG, JPG, JPEG
              </p>
            </div>
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
                <input
                  type='text'
                  className={`${styles.form__input} ${styles.form__input_search}`}
                  placeholder='Поиск по товарам'
                />
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
