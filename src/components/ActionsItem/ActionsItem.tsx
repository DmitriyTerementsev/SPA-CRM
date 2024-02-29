import React from 'react';
import styles from '../Actions/Actions.module.scss';
interface ActionsItemProps {
  handleClickItem: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  categories: string;
  subcategories: string;
  brand: string;
  cashback: string;
  product: string;
  id: string;
  checked: boolean;
}

function ActionsItem({
  categories,
  subcategories,
  brand,
  product,
  cashback,
  handleClickItem,
  id,
  checked,
}: ActionsItemProps) {
  return (
    <li className={styles.actions__item} id={id}>
      <input
        type='checkbox'
        className={styles.actions__checkbox}
        onClick={(e) => handleClickItem(e)}
        onChange={() => checked}
      />
      <p
        className={`${styles.actions__text} ${styles.actions__text_item} ${styles.actions__text_categories}`}
      >
        {categories}
      </p>
      <p
        className={
          styles.actions__text +
          ' ' +
          styles.actions__text_item +
          ' ' +
          styles.actions__text_subcategories
        }
      >
        {subcategories}
      </p>
      <p
        className={
          styles.actions__text +
          ' ' +
          styles.actions__text_item +
          ' ' +
          styles.actions__text_brand
        }
      >
        {brand}
      </p>
      <p
        className={
          styles.actions__text +
          ' ' +
          styles.actions__text_item +
          ' ' +
          styles.actions__text_product
        }
      >
        {product}
      </p>
      <p
        className={
          styles.actions__text +
          ' ' +
          styles.actions__text_item +
          ' ' +
          styles.actions__text_cashback
        }
      >
        {cashback}
      </p>
    </li>
  );
}

export default ActionsItem;
