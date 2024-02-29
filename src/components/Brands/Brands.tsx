import React, { useEffect, useState } from 'react';
import styles from './Brands.module.scss';
import BrandsDescription from '../BrandsDescription/BrandsDescription.tsx';
import { ReactComponent as Upload } from '../../assets/icons/upload.svg';
import BrandsItem from '../BrandsItem/BrandsItem.tsx';
import fakeLogo from '../../assets/icons/fakeLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { addBrand, deleteBrand } from '../../redux/actions/brandActions.ts';
import PopupDeleteItem from '../PopupDeleteItem/PopupDeleteItem.tsx';

function Brands() {
  const data: any = useSelector((item) => {
    return item;
  });
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState({})
  const [brandsItems, setBrandsItems] = useState([]);
  const [activeBrands, setActiveBrands] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [inputLogoValue, setInputLogoValue] = useState('');
  const [inputLogoTextValue, setInputTextValue] = useState(
    'Загрузить логотип бренда'
  );
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setBrandsItems(data.brand.brands);
  }, [data]);

  useEffect(() => {
    brandsItems.length > 0 ? setActiveBrands(false) : setActiveBrands(true);
  }, [brandsItems.length]);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      let id: number = Math.floor(Math.random() * 10000) + 1;
      dispatch(
        addBrand({
          brandName: inputValue,
          id: id,
          logo: fakeLogo,
        })
      );
      setInputValue('');
      setInputLogoValue('');
    }
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteBrand(id));
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(e.target.value.replace('C:\\fakepath\\', ''));
  };

  useEffect(() => {
    inputLogoValue.trim() === ''
      ? setInputTextValue('Загрузить логотип бренда')
      : setInputTextValue(inputLogoValue);
  }, [inputLogoValue]);

  const openPopup = (item) => {
    if (isOpen === false) {
      setIsOpen(true);
      setSelectedBrand(item)
    } else {
      setIsOpen(false);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function keyHandler(evt: any) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', keyHandler);
    }
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen]);

  const [isUpload, setIsUpload] = useState(false);
  const checkUpload = () => {
    if (isUpload === false) {
      setIsUpload(true);
    } else {
      setIsUpload(false);
      setInputTextValue('Загрузить логотип бренда');
    }
  };

  return (
    <section className={styles.brands}>
      <form className={styles.brands__form} onSubmit={handleAddItem}>
        <input
          className={styles.brands__input}
          type='text'
          placeholder='Введите название бренда'
          value={inputValue}
          onChange={handleChange}
        />
        <div
          className={
            !isUpload
              ? `${styles.brands__input} ${styles.brands__input_upload}`
              : `${styles.brands__input} ${styles.brands__input_upload} ${styles.brands__input_upload_active}`
          }
        >
          <input
            type='file'
            id='file'
            value={inputLogoValue}
            onChange={handleChangeFile}
          />
          <input
            type='text'
            value={inputLogoTextValue}
            onChange={() => console.log('yes')}
          />
          <Upload className={styles.icon} />
        </div>
        <button className={styles.brands__button} type='submit'>
          Добавить бренд
        </button>
        <span>Размер логотипа 500x500 px PNG, JPG, JPEG</span>
      </form>
      <BrandsDescription />
      <ul className={styles.brands__items}>
        {activeBrands ? (
          <p className={styles.brands__null}>Здесь пока нет брендов</p>
        ) : (
          brandsItems?.map((item: any) => (
            <BrandsItem
              key={item.id}
              item={item}
              brandName={item.name}
              logo={item.logo}
              handleDeleteItem={() => handleDeleteItem(item.id)}
              openPopup={openPopup}
              checkUpload={checkUpload}
              isOpen={isOpen}
              onClose={onClose}
              inputLogoTextValue={inputLogoTextValue}
            />
          ))
        )}
      </ul>

      <PopupDeleteItem
        isOpen={isOpen}
        onClose={onClose}
        handleDeleteItem={handleDeleteItem}
        selectedBrand={selectedBrand}
      />
    </section>
  );
}

export default Brands;
