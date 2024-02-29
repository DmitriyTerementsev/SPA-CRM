import styles from './Categories.module.scss';
import React, { useState, useEffect } from 'react';
import CategoriesItem from '../CategoriesItem/CategoriesItem.tsx';
import { ReactComponent as Arrows } from '../../assets/icons/arrows.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  deleteCategory,
} from '../../redux/actions/categoryActions.ts';
import {
  addSubCategory,
  deleteSubCategory,
} from '../../redux/actions/subCategoryActions.ts';

function Categories() {
  const data: any = useSelector((item) => {
    return item;
  });
  const categories = data.category.categories;
  const subCategories = data.subCategory.subCategories;
  const dispatch = useDispatch();
  const [isActiveCat, setIsActiveCat] = useState(false);
  const [isActiveSubCat, setIsActiveSubCat] = useState(false);
  const [inputValueCat, setInputValueCat] = useState('');
  const [inputValueSubCat, setInputValueSubCat] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<null | number>(null);
  //const [selectedId, setSelectedId] = useState('')
  const [categoriesItems, setCategoriesItems] = useState(categories);
  const [isClicked, setIsClicked] = useState(false);
  const [subCategoriesItems, setSubCategoriesItems] = useState(subCategories);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueCat(e.target.value);
  };

  const handleChangeSub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueSubCat(e.target.value);
  };

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValueCat.trim() !== '') {
      let id: number = Math.floor(Math.random() * 10000) + 1;
      dispatch(
        addCategory({
          name: inputValueCat,
          id: id,
          position: id,
        })
      );
      setInputValueCat('');
    }
  };

  useEffect(() => {
    setCategoriesItems(categories);
  }, [categories]);

  const handleAddSubItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValueSubCat.trim() === '') return;
    let id: number = Math.floor(Math.random() * 10000) + 1;
    dispatch(
      addSubCategory({
        name: inputValueSubCat,
        id: id,
        position: selectedCategory,
        catalog_product: { id: id },
      })
    );
    setInputValueSubCat('');
  };

  const handleDeleteItem = (id: number, position: number) => {
    console.log(selectedCategory, position);
    if (selectedCategory === position) {
      dispatch(deleteCategory(id));
      setIsClicked(false);
    } else {
      dispatch(deleteCategory(id));
    }
  };

  const handleDeleteSubItem = (id: number) => {
    dispatch(deleteSubCategory(id));
  };

  const handleCompleteStatusUpdate = (item: {
    id: number;
    position: number;
  }) => {
    if (item.position !== selectedCategory) {
      setIsClicked(true);
      setSelectedCategory(item.position);
    } else {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    categoriesItems.length > 0 ? setIsActiveCat(true) : setIsActiveCat(false);
  }, [categoriesItems]);

  useEffect(() => {
    subCategoriesItems.length === 0
      ? setIsActiveSubCat(true)
      : setIsActiveSubCat(false);
  }, [subCategoriesItems]);

  useEffect(() => {
    if (isClicked === false) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedCategory);
    }
  }, [isClicked, selectedCategory]);

  useEffect(() => {
    setSubCategoriesItems(
      subCategories
        .filter((item: any) => item.position === selectedCategory)
        .map((item: any) => item)
    );
  }, [categoriesItems, selectedCategory, subCategories, isClicked]);

  useEffect(() => {
    if (categoriesItems.length === 0) {
      setIsClicked(false);
    }
  }, [categoriesItems]);

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
          <p className={styles.categories__description}>Название категории</p>
          <ul className={styles.categories__items}>
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
                name={item.name}
                handleDeleteItem={() =>
                  handleDeleteItem(item.id, item.position)
                }
                handleCompleteStatusUpdate={() =>
                  handleCompleteStatusUpdate(item)
                }
                selectedCategory={selectedCategory}
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
          <p className={styles.categories__description}>
            Название подкатегории
          </p>
          <ul className={styles.categories__items}>
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
                key={item.id}
                categoriesItems={categoriesItems}
                item={item}
                name={item.name}
                handleDeleteItem={() => handleDeleteSubItem(item.id)}
                handleCompleteStatusUpdate={() =>
                  handleCompleteStatusUpdate(item)
                }
                selectedCategory={selectedCategory}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Categories;
