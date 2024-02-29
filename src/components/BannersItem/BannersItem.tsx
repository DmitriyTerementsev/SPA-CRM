import React from 'react';
import styles from '../TableItem/TableItem.module.scss';
import style from '../Banners/Banners.module.scss';
import TableItem from '../TableItem/TableItem.tsx';
import { ReactComponent as TrashButton } from '../../assets/icons/trashButton.svg';
import { ReactComponent as EditButton } from '../../assets/icons/editButton.svg';

interface BannersItemProps {
  name: string;
  handleDeleteItem: (id) => void;
  openPopup: () => void;
  handleSetItem: (item) => void;
  item: any;
}

function BannersItem({
  name,
  handleDeleteItem,
  openPopup,
  handleSetItem,
  item,
}: BannersItemProps) {

  
  return (
    <TableItem>
      <p className={`${styles.item__text} ${styles.item__text_city}`}>{name}</p>
      <div className={styles.item__buttons}>
        <EditButton
          className={style.cities__delete}
          onClick={() => handleSetItem(item)}
        />
        <TrashButton
          className={style.cities__delete}
          onClick={() => handleDeleteItem(item.id)}
        />
      </div>
    </TableItem>
  );
}

export default BannersItem;
