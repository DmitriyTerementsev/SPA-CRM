import styles from '../Table/TableItem/TableItem.module.scss';
import style from './Promocode.module.scss';
import TableItem from '../Table/TableItem/TableItem';
import { ReactComponent as TrashButton } from '../../assets/icons/trashButton.svg';
import { ReactComponent as EditButton } from '../../assets/icons/editButton.svg';
import { Item } from '../Products/Products';

interface PromocodeItemProps {
  name: string;
  handleDeleteItem: (id: Item) => void;
  openPopup: () => void;
  handleSetItem: (item: Item) => void;
  item: any;
}

function PromocodeItem({
  name,
  handleDeleteItem,
  handleSetItem,
  item,
}: PromocodeItemProps) {
  return (
    <TableItem>
      <>
        <p className={`${styles.item__text} ${styles.item__text_city}`}>
          {name}
        </p>
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
      </>
    </TableItem>
  );
}

export default PromocodeItem;
