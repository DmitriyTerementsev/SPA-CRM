import React, { useState, useEffect } from 'react';
import styles from './Promocode.module.scss';
import PromocodeDescription from './PromocodeDescription';
import PromocodeItem from './PromocodeItem';
import PopupOrders from '../PopupWithForm/PopupPromocode/PopupPromocode';
import PromocodesStore from '../../store/PromocodesStore';
import { observer } from 'mobx-react';

export interface Item {
  id: string;
  name: string;
  promocode: string;
  percent: string;
}

export const Promocode = observer(() => {
  const { promocodes, getPromocodesAction } = PromocodesStore;
  const initialItem: Item = { id: '', name: '', promocode: '', percent: '' };
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [showProducts, setShowProducts] = useState<Item[]>([]);

  const openPopup = () => {
    if (isOpen === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    setSelectedItem(initialItem);
  };

  const handleSetItem = (item: Item) => {
    console.log('yes')
    setSelectedItem(item);
    openPopup();
  };

  const handleDeleteItem = async (id: string) => {
    await PromocodesStore.deletePromocode(id);
    onClose();
    setSelectedItem(initialItem);
  };

  useEffect(() => {
    getPromocodesAction();
  }, []);

  useEffect(() => {
    promocodes?.state === 'fulfilled'
      ? setShowProducts(promocodes?.value)
      : setShowProducts([]);
  }, [promocodes?.state, promocodes?.value]);

  return (
    <section className={styles.cities}>
      <button className={styles.cities__button} onClick={() => openPopup()}>
        Добавить промокод
      </button>
      <PromocodeDescription />
      <ul className={styles.cities__items}>
        {showProducts.map((item: Item) => (
          <PromocodeItem
            item={item}
            key={item.id}
            name={item.name}
            handleDeleteItem={() => handleDeleteItem(item.id)}
            openPopup={openPopup}
            handleSetItem={() => handleSetItem(item)}
          />
        ))}
      </ul>
      <PopupOrders
        isOpen={isOpen}
        onClose={onClose}
        selectedItem={selectedItem}
        handleDeleteItem={() => handleDeleteItem(selectedItem.id)}
      />
    </section>
  );
});
