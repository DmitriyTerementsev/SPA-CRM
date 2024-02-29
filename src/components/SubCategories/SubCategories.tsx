import React, { useEffect, useState } from 'react';
import ProtocolsItem from '../ProtocolsItem/ProtocolsItem.tsx';
import styles from '../Protocols/Protocols.module.scss';
import { useGetSubCategoriesQuery } from '../../redux/Api/subCategoriesApi.ts';

function SubCategories({
  handleCompleteStatusUpdate,
  selectedCategory,
  isClicked,
  handleAddSubItem,
  inputValueSubCat,
  handleChangeSub,
  handleDeleteSubItem,
}) {
  const { data = [] } = useGetSubCategoriesQuery('');
  const [subCategories, setSubCategories] = useState(data);
  const [isActiveSubCat, setIsActiveSubCat] = useState(false);

  useEffect(() => {
    subCategories.length > 0
      ? setIsActiveSubCat(false)
      : setIsActiveSubCat(true);
  }, [subCategories]);

  useEffect(() => {
    setSubCategories(
      data.filter(
        (item: { protocol_category: { id: string; name: string } }) =>
          item.protocol_category.id === selectedCategory
      )
    );
  }, [selectedCategory, data]);

  return (
    <>
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
        <p className={styles.categories__description}>Название подкатегории</p>
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
          {subCategories?.map(
            (item: { id: string; name: string; description: undefined }) => (
              <ProtocolsItem
                key={item.id}
                categoriesItems={data}
                item={item}
                name={item.name}
                handleDeleteItem={() => handleDeleteSubItem(item.id)}
                handleCompleteStatusUpdate={() =>
                  handleCompleteStatusUpdate(item)
                }
                selectedCategory={selectedCategory}
              />
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default SubCategories;
