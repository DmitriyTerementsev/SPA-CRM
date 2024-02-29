import styles from '../../Table/TableItem/TableItem.module.scss';
import TableItem from '../../Table/TableItem/TableItem';
import { Item } from '../Products';

interface ProductsItemProps {
  name: string;
  article: string;
  openPopup: (item: Item) => void;
  item: any;
}

function ProductsItem({ name, article, openPopup, item }: ProductsItemProps) {
  return (
    <div
      onClick={() => {
        openPopup(item);
      }}
    >
      <TableItem>
        <>
          {/* <input type='checkbox' className={`${styles.item__checkbox}`} /> */}
          <p className={`${styles.item__text}`}>{name}</p>
          <p className={`${styles.item__text} ${styles.item__text_article}`}>
            {article}
          </p>
        </>
      </TableItem>
    </div>
  );
}

export default ProductsItem;
