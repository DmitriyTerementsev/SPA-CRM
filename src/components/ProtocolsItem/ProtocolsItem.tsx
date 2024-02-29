import React, { useState } from 'react';
import { ReactComponent as EditButton } from '../../assets/icons/editButton.svg';
import { ReactComponent as TrashButton } from '../../assets/icons/trashButton.svg';
import styles from '../Protocols/Protocols.module.scss';
import { useEditCategoriesMutation } from '../../redux/Api/categoriesApi.ts';
import { useEditSubCategoriesMutation } from '../../redux/Api/subCategoriesApi.ts';
import { Protocol } from '../Protocols/Protocols.tsx';

interface CategoriesItemProps {
  item: Protocol;
  handleDeleteItem: (id: string) => void;
  handleCompleteStatusUpdate: (item: any) => void;
  name: string;
  categoriesItems: any[];
  selectedCategory: string | null;
}

function ProtocolsItem({
  item,
  handleDeleteItem,
  name,
  handleCompleteStatusUpdate,
  selectedCategory,
}: CategoriesItemProps) {
  const [isEdited, setIsEdited] = useState(false);
  const [text, setText] = useState(name);
  const [editCategory] = useEditCategoriesMutation();
  const [editSubCategory] = useEditSubCategoriesMutation();

  const handleDeleteClick = () => {
    handleDeleteItem(item.id);
  };

  const handleEditClick = async (id: string) => {
    if (isEdited && item.protocol_category === undefined) {
      await editCategory({
        id,
        data: {
          ...item,
          name: text,
        },
      }).unwrap();
    } else {
      await editSubCategory({
        id,
        data: {
          ...item,
          name: text,
        },
      }).unwrap();
    }
    setIsEdited(!isEdited);
  };

  const handleEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCheckBox = () => {
    handleCompleteStatusUpdate(item);
  };

  return (
    <li
      className={
        item.id === selectedCategory && item.protocol_category === undefined
          ? `${styles.categories__item} ${styles.categories__item_click}`
          : styles.categories__item
      }
    >
      <div
        className={styles.div}
        onClick={() =>
          item.protocol_category === undefined ? handleCheckBox() : null
        }
      >
        {!isEdited ? (
          <p className={styles.task__text}>{text}</p>
        ) : (
          <input
            className={`${styles.task__text_edit} ${styles.task__text_active}`}
            name='textEdit'
            onChange={handleEditText}
            value={text}
            autoFocus
          />
        )}
      </div>
      <div className={styles.categories__buttons}>
        <button
          type='button'
          className={`${styles.categories__button} ${styles.categories__button_icon}`}
          onClick={() => handleEditClick(item.id)}
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

export default ProtocolsItem;
