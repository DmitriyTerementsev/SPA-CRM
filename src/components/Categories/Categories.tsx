import React, { useEffect, useState } from 'react';
import ProtocolsItem from '../ProtocolsItem/ProtocolsItem.tsx';
import styles from '../Protocols/Protocols.module.scss';
import { useGetCategoriesQuery } from '../../redux/Api/categoriesApi.ts';
import { Protocol } from '../Protocols/Protocols.tsx';

interface CategoriesProps {
  handleAddItem: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValueCat: string;
  handleChange: () => void;
  handleDeleteItem: (id: string) => void;
  handleCompleteStatusUpdate: (item: Protocol) => void;
  selectedCategory: any;
}

function Categories({
  handleAddItem,
  inputValueCat,
  handleChange,
  handleDeleteItem,
  handleCompleteStatusUpdate,
  selectedCategory,
}: CategoriesProps) {
  const [isActiveCat, setIsActiveCat] = useState(false);
  const { data = [] } = useGetCategoriesQuery('');

  useEffect(() => {
    data.length > 0 ? setIsActiveCat(true) : setIsActiveCat(false);
  }, [data]);

  return (
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
          Добавить категорию протокола
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
        {data?.map((item: Protocol) => (
          <ProtocolsItem
            categoriesItems={data}
            item={item}
            key={item.id}
            name={item.name}
            handleDeleteItem={() => handleDeleteItem(item.id)}
            handleCompleteStatusUpdate={() => handleCompleteStatusUpdate(item)}
            selectedCategory={selectedCategory}
          />
        ))}
      </ul>
    </div>
  );
}

export default Categories;
