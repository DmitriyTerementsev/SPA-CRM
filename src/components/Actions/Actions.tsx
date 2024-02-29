import React from 'react';
import styles from './Actions.module.scss';
import ActionsDescription from '../ActionsDescription/ActionsDescription.tsx';
import ActionsItem from '../ActionsItem/ActionsItem.tsx';
import ActionsSelected from '../ActionsSelected/ActionsSelected.tsx';

interface ActionsProps {
  list: React.MutableRefObject<null>;
  handleDeleteItem: () => void;
  handleClickAllSelect: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  handleClickItem: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  counter: number;
  isActive: boolean;
  closePopup: () => void;
  showProducts: any[];
  description: React.MutableRefObject<null>;
}

function Actions({
  list,
  handleDeleteItem,
  handleClickAllSelect,
  handleClickItem,
  counter,
  isActive,
  closePopup,
  showProducts,
  description,
}: ActionsProps) {
  return (
    <div className={styles.actions}>
      <ActionsDescription
        handleClickAllSelect={(e) => handleClickAllSelect(e)}
        description={description}
      />
      <ul className={styles.actions__items} ref={list}>
        {showProducts?.map(
          (product) => (
            <ActionsItem
              key={product.id}
              categories={product.categories}
              subcategories={product.subcategories}
              brand={product.brand}
              product={product.product}
              cashback={product.cashback}
              handleClickItem={(e) => handleClickItem(e)}
              id={product.id}
              checked={product.checked}
            />
          )
        )}
      </ul>
      <ActionsSelected
        counter={counter}
        handleDeleteItem={handleDeleteItem}
        isActive={isActive}
        closePopup={closePopup}
      />
    </div>
  );
}

export default Actions;
