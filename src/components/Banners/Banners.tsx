import React, { useState } from 'react';
import styles from './Banners.module.scss';
import BannersDescription from '../BannersDescription/BannersDescription.tsx';
import BannersItem from '../BannersItem/BannersItem.tsx';
import {
  useGetBannersQuery,
  useDeleteBannersMutation,
} from '../../redux/Api/bannersApi.ts';
import PopupOrders from '../PopupOrders/PopupOrders.tsx';

export interface Item {
  id: string;
  description: string;
  image: string;
  name: string;
}

function Banners() {
  const { data = [] } = useGetBannersQuery('');
  const [deleteBanners] = useDeleteBannersMutation();
  const initialItem: Item = { id: '', description: '', image: '', name: '' };

  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>(initialItem);

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
    setSelectedItem(item);
    openPopup();
  };

  const handleDeleteItem = async (id: string) => {
    await deleteBanners(id);
    onClose();
    setSelectedItem(initialItem);
  };

  return (
    <section className={styles.cities}>
      <button className={styles.cities__button} onClick={() => openPopup()}>
        Добавить баннер
      </button>
      <BannersDescription />
      <ul className={styles.cities__items}>
        {data?.map((item: Item) => (
          <BannersItem
            item={item}
            key={item.id}
            name={item.name}
            handleDeleteItem={() => handleDeleteItem(item.id)}
            openPopup={openPopup}
            handleSetItem={handleSetItem}
          />
        ))}
      </ul>
      <PopupOrders
        isOpen={isOpen}
        onClose={onClose}
        selectedItem={selectedItem}
        handleDeleteItem={() => handleDeleteItem(selectedItem.id)}
        initialItem={initialItem}
      />
    </section>
  );
}

export default Banners;
