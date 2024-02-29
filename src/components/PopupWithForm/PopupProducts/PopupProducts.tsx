import PopupWithForm from '../PopupWithForm';
import styles from '../PopupWithForm.module.scss';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Link } from '../../../assets/icons/GDbanners.svg';
import ProductsStore from '../../../store/ProductsStore';
import { Item } from '../../Products/Products';
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

function PopupProducts({ isOpen, onClose, item }: PopupProps) {
  const [name1C, setName1C] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [article, setArticle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleEditClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await ProductsStore.editProduct({
      id: item.id,
      nameFrom1C: name1C,
      name: name,
      codeFrom1C: article,
      description: description,
      images: image,
      price: price,
      brand: {id: name}
    });
    onClose();
  };

  useEffect(() => {
    if (item) {
      setName1C(item.nameFrom1C);
      setName(item.name);
      setBrand(item.name);
      setArticle(item.codeFrom1C);
      setDescription(item.description);
      setImage(item.images);
      setPrice(item.price);
    }
  }, [item]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose}>
      <div className={styles.popup__container}>
        <form className={styles.form} onSubmit={(e) => handleEditClick(e)}>
          <div className={styles.popup__buttons}>
            <button
              type='button'
              className={styles.popup__button}
              onClick={() => onClose()}
            >
              Закрыть
            </button>
            <button
              type='submit'
              className={`${styles.popup__button} ${styles.popup__button_submit}`}
            >
              Сохранить и закрыть
            </button>
          </div>
          <div className={styles.form__container}>
            <p className={styles.form__label}>Название 1С</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Название 1С'
              value={name1C || ''}
              onChange={(e) => setName1C(e.target.value)}
            />
            <p className={styles.form__label}>Название*</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Название'
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
            <p className={styles.form__label}>Бренд*</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Бренд'
              value={brand || ''}
              onChange={(e) => setBrand(e.target.value)}
            />
            <p className={styles.form__label}>Артикул</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Артикул'
              value={article || ''}
              onChange={(e) => setArticle(e.target.value)}
            />
            <p className={styles.form__label}>Описание*</p>
            <input
              type='text'
              className={`${styles.form__input} ${styles.form__input_info}`}
              placeholder='Описание'
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className={styles.form__label}>Изображения*</p>
            <input
              type='text'
              className={`${styles.form__input} ${styles.form__input_text}`}
              placeholder='Вставьте ссылку на Google Drive'
              value={image || ''}
              onChange={(e) => setImage(e.target.value)}
            />
            <Link className={styles.form__icon} />
            <p className={styles.form__text}>
              Размер баннера 1000x1000 px PNG, JPG, JPEG
            </p>
            <p className={styles.form__label}>Цена</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Цена'
              value={price || ''}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className={styles.form__inputs}>
              <div className={styles.form__element}>
                <input
                  type='text'
                  className={`${styles.form__input} ${styles.form__input_delivery}`}
                  placeholder='Выберите категорию'
                />
                <input
                  type='text'
                  className={`${styles.form__input} ${styles.form__input_delivery}`}
                  placeholder='Выберите подкатегорию'
                />
              </div>
            </div>
            <div className={styles.form__inputs}>
              <p className={styles.form__label}>Объем</p>
              <div className={styles.form__element}>
                <input
                  type='text'
                  className={`${styles.form__input} ${styles.form__input_delivery}`}
                  placeholder='Город'
                />
                <input
                  type='text'
                  className={`${styles.form__input} ${styles.form__input_delivery}`}
                  placeholder='Улица'
                />
              </div>
              <button
                type='button'
                className={`${styles.popup__button} ${styles.popup__button_edit}`}
              >
                + Добавить объем
              </button>
            </div>
            <div className={styles.form__inputs}>
              <p className={styles.form__label}>Характеристики</p>
              <div className={styles.form__element}>
                <input
                  type='text'
                  className={`${styles.form__input} ${styles.form__input_delivery}`}
                  placeholder='Город'
                />
                <input
                  type='text'
                  className={`${styles.form__input} ${styles.form__input_delivery}`}
                  placeholder='Улица'
                />
              </div>
              <button
                type='button'
                className={`${styles.popup__button} ${styles.popup__button_edit}`}
              >
                + Добавить характеристику
              </button>
            </div>
            <p className={styles.form__label}>Тэги товаров</p>
            <input
              type='text'
              className={styles.form__input}
              placeholder='Тэги товаров'
            />
          </div>
        </form>
      </div>
    </PopupWithForm>
  );
}

export default PopupProducts;
