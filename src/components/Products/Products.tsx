import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import Actions from '../Actions/Actions.tsx';
import Popup from '../Popup/Popup.tsx';
import TableNavigation from '../TableNavigation/TableNavigation.tsx';
import products from '../../constants/products.ts';
import {
  ShowItemsValue,
  ProductList,
  ItemsDescription,
} from '../../contexts/ShowItemsValue.jsx';
import styles from '../Table/Table.module.scss';

function Products() {
  //----------States
  const [isActive, setActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState(1);
  const [showPages, setShowPages] = useState(10);
  const [isOpen, setOpen] = useState(false);

  const [categoriesSelect, setCategories] = useState('');
  const [subcategoriesSelect, setSubcategories] = useState('');
  const [brandSelect, setBrand] = useState('');
  const [cashbackSelect, setCashback] = useState('');
  const list = useRef(null);
  const description = useRef(null);

  let showProducts = products
    .slice(currentPage * showPages, currentPage * showPages + showPages)
    .map((item) => item);

  //----------functions
  //----------Open/Close Popups
  const closePopup = () => {
    if (isActive === true) {
      setActive(false);
    }
  };

  const openPopup = () => {
    if (isOpen === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    addItem();
  };

  function addItem() {
    if (
      (categoriesSelect &&
        subcategoriesSelect &&
        brandSelect &&
        cashbackSelect) !== ''
    ) {
      let newObject = {
        categories: categoriesSelect,
        subcategories: subcategoriesSelect,
        brand: brandSelect,
        cashback: cashbackSelect,
        id: products.length + 1,
      };
      products.push(newObject);
    }
  }

  useCallback(onClose, [isOpen]);

  //----------Click On Next/Prev Button

  function handleClickItem(e: any) {
    if (e.target.checked === true) {
      setCounter(counter + 1);
    } else {
      setCounter(counter - 1);
    }
  }

  //----------Click on checkbox - select All

  function handleClickAllSelect(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    setCounter(showProducts.length);
  }

  //----------Click on delete items

  function handleDeleteItem() {
    setActive(false);
    setCounter(0);
  }

  //----------Effects

  useEffect(() => {
    if (counter > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [counter]);

  useEffect(() => {
    setAllPages(Math.ceil(products.length / showPages));
  }, [showPages]);

  useEffect(() => {
    if (currentPage === allPages) {
      setCurrentPage(allPages - 1);
    }
  }, [allPages, currentPage]);

  return (
    <ItemsDescription.Provider value={description}>
      <ShowItemsValue.Provider value={showPages}>
        <ProductList.Provider value={list}>
          <TableNavigation
            currentPage={currentPage}
            allPages={allPages}
            handleClickNext={() =>
              currentPage === allPages - 1
                ? null
                : setCurrentPage(currentPage + 1)
            }
            handleClickPrev={() =>
              currentPage > 0 ? setCurrentPage(currentPage - 1) : null
            }
            showPages={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setShowPages(Number(e.target.value))
            }
          />
          <button onClick={openPopup} className={styles.table__button}>
            Добавить акцию
          </button>
          <Actions
            list={list}
            handleDeleteItem={() => handleDeleteItem()}
            handleClickAllSelect={(
              e: React.MouseEvent<HTMLInputElement, MouseEvent>
            ) => handleClickAllSelect(e)}
            handleClickItem={(
              e: React.MouseEvent<HTMLInputElement, MouseEvent>
            ) => handleClickItem(e)}
            counter={counter}
            closePopup={closePopup}
            isActive={isActive}
            description={description}
            showProducts={showProducts}
          />
          <Popup
            isOpen={isOpen}
            onClose={onClose}
            categoriesSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategories(e.currentTarget.value)
            }
            subcategoriesSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSubcategories(e.currentTarget.value)
            }
            brandSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setBrand(e.currentTarget.value)
            }
            cashbackSelect={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCashback(e.currentTarget.value)
            }
          />
        </ProductList.Provider>
      </ShowItemsValue.Provider>
    </ItemsDescription.Provider>
  );
}

export default Products;
