import styles from './Categories.module.scss';
import React, { useState, useEffect } from 'react';
import CategoriesItem from '../CategoriesItem/CategoriesItem.tsx';
import categoriesList from '../../constants/categoriesList.ts';
import subCategoriesList from '../../constants/subCategoriesList.ts';
import { ReactComponent as Arrows } from '../../assets/icons/arrows.svg';

function Categories() {
  const [isActiveCat, setIsActiveCat] = useState(false);
  const [isActiveSubCat, setIsActiveSubCat] = useState(false);
  const [inputValueCat, setInputValueCat] = useState('');
  const [inputValueSubCat, setInputValueSubCat] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoriesItems, setCategoriesItems] = useState(categoriesList);
  const [isClicked, setIsClicked] = useState(false);
  const [subCategoriesItems, setSubCategoriesItems] =
    useState(subCategoriesList);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueCat(e.target.value);
  };

  const handleChangeSub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueSubCat(e.target.value);
  };

  // Обработчик добавления новой задачи
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValueCat.trim() !== '') {
      let id: number = Math.floor(Math.random() * 10000) + 1;
      const newList = [
        ...categoriesItems,
        {
          categoriesName: inputValueCat,
          id: id,
          status: false,
        },
      ];
      categoriesList.push({
        categoriesName: inputValueCat,
        id: id,
        status: false,
      });
      setCategoriesItems(newList);
      setInputValueCat('');
    }
  };

  const handleAddSubItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValueSubCat.trim() === '') return;
    let id: number = Math.floor(Math.random() * 10000) + 1;
    const newList = [
      ...subCategoriesItems,
      {
        categoriesName: inputValueSubCat,
        id: id,
        categories: selectedCategory,
      },
    ];
    subCategoriesList.push({
      categoriesName: inputValueSubCat,
      id: id,
      categories: selectedCategory,
    });
    setSubCategoriesItems(newList);
    setInputValueSubCat('');
  };

  // Обработчик удаления задачи
  const handleDeleteItem = (id: number) => {
    const newList = categoriesItems.filter((el) => el.id !== id);
    setCategoriesItems(newList);
  };

  const handleDeleteSubItem = (id: number) => {
    const newList = subCategoriesItems.filter((el) => el.id !== id);
    setSubCategoriesItems(newList);
  };

  const handleCompleteStatusUpdate = (item: {
    id: number;
    status: boolean;
  }) => {
    const newList = categoriesItems.map((el: any) => {
      if (el.id === item.id) {
        el.status = item.status;
      }
      return el;
    });
    setCategoriesItems(newList);
  };

  useEffect(() => {
    categoriesItems.length > 0 ? setIsActiveCat(true) : setIsActiveCat(false);
  }, [categoriesItems.length]);

  useEffect(() => {
    setIsClicked(categoriesItems.some((element) => element.status === true));
  }, [categoriesItems]);

  useEffect(() => {
    subCategoriesItems.length === 0
      ? setIsActiveSubCat(true)
      : setIsActiveSubCat(false);
  }, [subCategoriesItems]);

  useEffect(() => {
    if (isClicked === false) {
      setSelectedCategory(0);
    } else {
      setSelectedCategory(selectedCategory);
    }
  }, [isClicked, selectedCategory]);

  useEffect(() => {
    categoriesItems.forEach((item) => {
      if (item.status === true) {
        setSelectedCategory(item.id);
      }
    });
    setSubCategoriesItems(
      subCategoriesList
        .filter((item: any) => item.categories === selectedCategory)
        .map((item: any) => item)
    );
  }, [categoriesItems, selectedCategory, subCategoriesList]);

  useEffect(() => {
    setSubCategoriesItems(
      subCategoriesList
        .filter((item: any) => item.categories === selectedCategory)
        .map((item: any) => item)
    );
  }, [categoriesItems, isClicked, selectedCategory]);

  return (
    <section className={styles.categories}>
      <div className={styles.categories__elements}>
        <div className={styles.categories__element}>
          <form onSubmit={(e) => handleAddItem(e)}>
            <input
              type='text'
              className={styles.categories__input}
              placeholder='Введите название категории'
              value={inputValueCat}
              onChange={handleChange}
            />
            <button type='submit' className={styles.categories__button}>
              Добавить категорию
            </button>
          </form>
          <ul className={styles.categories__items}>
            <p className={styles.categories__description}>Название категории</p>
            <p
              className={
                !isActiveCat
                  ? `${styles.categories__null} ${styles.categories__null_active}`
                  : styles.categories__null
              }
            >
              Здесь пока нет категорий
            </p>
            {categoriesItems?.map((item: any) => (
              <CategoriesItem
                categoriesItems={categoriesItems}
                item={item}
                key={item.id}
                itemName={item.categoriesName}
                handleDeleteItem={() => handleDeleteItem(item.id)}
                handleCompleteStatusUpdate={() =>
                  handleCompleteStatusUpdate(item)
                }
              />
            ))}
          </ul>
        </div>
        <Arrows className={styles.arrows} />
        <p
          className={
            !isClicked
              ? `${styles.categories__choice} ${styles.categories__choice_active}`
              : styles.categories__choice
          }
        >
          Выберите категорию
        </p>
        <div
          className={
            !isClicked
              ? `${styles.categories__element} ${styles.categories__element_null}`
              : styles.categories__element
          }
        >
          <form onSubmit={(e) => handleAddSubItem(e)}>
            <input
              type='text'
              className={styles.categories__input}
              placeholder='Введите название подкатегории'
              value={inputValueSubCat}
              onChange={handleChangeSub}
            />
            <button type='submit' className={styles.categories__button}>
              Добавить подкатегорию
            </button>
          </form>
          <ul className={styles.categories__items}>
            <p className={styles.categories__description}>
              Название подкатегории
            </p>
            <p
              className={
                isActiveSubCat
                  ? `${styles.categories__null} ${styles.categories__null_active}`
                  : styles.categories__null
              }
            >
              Здесь пока нет подкатегорий
            </p>
            {subCategoriesItems?.map((item: any) => (
              <CategoriesItem
                categoriesItems={categoriesItems}
                item={item}
                key={item.id}
                itemName={item.categoriesName}
                handleDeleteItem={() => handleDeleteSubItem(item.id)}
                handleCompleteStatusUpdate={() =>
                  handleCompleteStatusUpdate(item)
                }
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Categories;
