import React, { useState } from 'react';
import { ReactComponent as EditButton } from '../../assets/icons/editButton.svg';
import { ReactComponent as TrashButton } from '../../assets/icons/trashButton.svg';
import styles from '../Categories/Categories.module.scss';
interface CategoriesItemProps {
  item: any;
  handleDeleteItem: (id: number) => void;
  handleCompleteStatusUpdate: (item: any) => void;
  itemName: string;
  categoriesItems: any[];
}

function CategoriesItem({
  item,
  handleDeleteItem,
  itemName,
  handleCompleteStatusUpdate,
  categoriesItems,
}: CategoriesItemProps) {
  const [isEdited, setIsEdited] = useState(false);
  const [text, setText] = useState(itemName);

  const handleDeleteClick = () => {
    handleDeleteItem(item.id);
  };

  const handleEditClick = () => {
    setIsEdited(!isEdited);
  };

  const handleEditText = (e: any) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setIsEdited(!isEdited);
    }
  };

  const [isComplete, setIsComplete] = useState(false);

  const handleCheckBox = () => {
    categoriesItems.forEach((item) => {
      if (item.status === true) {
        item.status = false;
      }
      handleCompleteStatusUpdate(item);
    });
    if (isComplete === false) {
      handleCompleteStatusUpdate(item);
      item.status = true;
    }
    setIsComplete(false);
  };

  return (
    <li
      className={
        item.status === true
          ? `${styles.categories__item} ${styles.categories__item_click}`
          : styles.categories__item
      }
    >
      <div
        className={styles.div}
        onClick={() => {
          item.status === false ? handleCheckBox() : console.log('no');
        }}
      >
        {!isEdited ? (
          <p className={styles.task__text} onClick={handleEditClick}>
            {text}
          </p>
        ) : (
          <input
            className={`${styles.task__text_edit} ${styles.task__text_active}`}
            name='textEdit'
            onChange={handleEditText}
            value={text}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        )}
      </div>
      <div className={styles.categories__buttons}>
        <button
          type='button'
          className={`${styles.categories__button} ${styles.categories__button_icon}`}
          onClick={handleEditClick}
        >
          <EditButton className={styles.categories__edit} />
        </button>
        <button
          type='button'
          className={`${styles.categories__button} ${styles.categories__button_icon}`}
          onClick={handleDeleteClick}
        >
          <TrashButton className={styles.categories__edit} />
        </button>
      </div>
    </li>
  );
}

export default CategoriesItem;
