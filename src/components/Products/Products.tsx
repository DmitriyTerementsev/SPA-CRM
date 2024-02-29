/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import TableNavigation from '../Table/TableNavigation/TableNavigation';
import TableSearch from '../Table/TableSearch/TableSearch';
import ProductsDescription from './ProductsDescription/ProductsDescription';
import ProductsItem from './ProductsItem/ProductsItem';
import PopupProducts from '../PopupWithForm/PopupProducts/PopupProducts';
import ProductsStore from '../../store/ProductsStore';
import { observer } from 'mobx-react';

export interface Item {
  id: string;
  nameFrom1C: string;
  brand: { id: string };
  description: string;
  images: string;
  price: string;
  name: string;
  codeFrom1C: string;
}

export const Products = observer(() => {
  const initialItem: Item = {
    codeFrom1C: '',
    name: '',
    id: '',
    nameFrom1C: '',
    brand: { id: '' },
    description: '',
    images: '',
    price: '',
  };
  const [isActive, setActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState(1);
  const [showPages, setShowPages] = useState('10');
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const [showProducts, setShowProducts] = useState<any[]>([]);
  const { products, getProductsAction } = ProductsStore;

  const closePopup = () => {
    if (isActive === true) {
      setActive(false);
    }
  };

  const openPopup = (item: Item) => {
    if (isOpen === false) {
      setOpen(true);
      setSelectedItem(item);
    } else {
      setOpen(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    setSelectedItem(initialItem);
  };

  const handleInputClear = () => {
    setInputValue('');
  };

  useEffect(() => {
    getProductsAction();
  }, []);

  useEffect(() => {
    if (inputValue.trim() === '' && products?.state === 'fulfilled') {
      setShowProducts(
        products?.value.slice(
          currentPage * Number(showPages),
          currentPage * Number(showPages) + showPages
        )
      );
    } else {
      const filteredOrders = showProducts.filter(
        (item: Item) =>
          (item.name !== null &&
            item.name
              .toLowerCase()
              .includes(inputValue.toLowerCase().trim())) ||
          (item.codeFrom1C !== null &&
            item.codeFrom1C
              .toLowerCase()
              .includes(inputValue.toLowerCase().trim()))
      );
      setShowProducts(
        filteredOrders.slice(
          currentPage * Number(showPages),
          Number(currentPage) * Number(showPages) + Number(showPages)
        )
      );
    }
  }, [
    inputValue,
    showPages,
    currentPage,
    products?.state,
    products?.value,
    getProductsAction
  ]);

  return (
    <>
      <TableSearch
        inputValue={(e) => setInputValue(e.target.value)}
        handleInputClear={handleInputClear}
        placeholder={'Поиск по заказам'}
        value={inputValue}
      />
      <TableNavigation
        currentPage={currentPage}
        allPages={allPages}
        handleClickNext={() =>
          currentPage === allPages - 1 ? null : setCurrentPage(currentPage + 1)
        }
        handleClickPrev={() =>
          currentPage > 0 ? setCurrentPage(currentPage - 1) : null
        }
        showPages={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setShowPages(e.target.value)
        }
      />
      <ProductsDescription />

      {showProducts.map((item: Item) => (
        <ProductsItem
          key={item.id + item.name + item.codeFrom1C}
          name={item.name}
          article={item.codeFrom1C}
          openPopup={openPopup}
          item={item}
        />
      ))}

      <PopupProducts
        isOpen={isOpen}
        onClose={() => onClose()}
        item={selectedItem}
      />
    </>
  );
});
