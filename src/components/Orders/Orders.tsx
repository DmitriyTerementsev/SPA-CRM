import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import {
  getOrders,
  editOrderName,
  editOrderNumber,
} from '../../redux/thunks/orderThunk.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks.ts';
import { Order } from '../../interfaces/Order.ts';
import TableSearch from '../Table/TableSearch/TableSearch.tsx'
import TableNavigation from '../Table/TableNavigation/TableNavigation.tsx'
import OrderDescription from '../Orders/OrderDescription/OrderDescription.tsx'
import OrderItem from '../Orders/OrderItem/OrderItem.tsx'
import PopupOrders from '../PopupWithForm/PopupOrders/PopupOrders.tsx'

function Orders() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((item) => {
    return item.order.orders;
  });
  const allOrders = data;
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState(1);
  const [showPages, setShowPages] = useState(10);
  const [orders, setOrders] = useState(allOrders);
  const [activeOrders, setActiveOrders] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const openPopup = (item: Order) => {
    if (isOpen === false) {
      setOpen(true);
      setSelectedOrder(item);
    } else {
      setOpen(false);
    }
  };

  const handleInputClear = () => {
    setInputValue('');
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEditOrder = (
    e: React.FormEvent<HTMLFormElement>,
    { userName, selectedOrder, userOrder }
  ) => {
    let name: string = userName.split(' ')[0];
    let lastName: string = userName.split(' ')[1];
    if (name === undefined) {
      name = ' ';
    }
    if (lastName === undefined) {
      lastName = ' ';
    }
    e.preventDefault();
    dispatch(editOrderName({ name, lastName, id: selectedOrder.id }));
    dispatch(editOrderNumber({ order: userOrder, id: selectedOrder.id }));
    onClose();
  };

  useEffect(() => {
    setAllPages(Math.ceil(allOrders.length / showPages));
  }, [allOrders, showPages]);

  useEffect(() => {
    orders.length === 0 ? setActiveOrders(true) : setActiveOrders(false);
  }, [inputValue, orders]);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setOrders(
        allOrders.slice(
          currentPage * showPages,
          currentPage * showPages + showPages
        )
      );
    } else {
      const filteredOrders = allOrders.filter(
        (item: Order) =>
          (item.user.name !== null &&
            item.user.name
              .toLowerCase()
              .includes(inputValue.toLowerCase().trim())) ||
          (item.user.lastName !== null &&
            item.user.lastName
              .toLowerCase()
              .includes(inputValue.toLowerCase().trim())) ||
          (item.user.name !== null &&
            item.user.lastName !== null &&
            (item.user.name + ' ' + item.user.lastName)
              .toLowerCase()
              .includes(inputValue.toLowerCase().trim()))
      );
      setOrders(
        filteredOrders.slice(
          currentPage * showPages,
          currentPage * showPages + showPages
        )
      );
    }
  }, [inputValue, showPages, currentPage, allOrders]);

  useEffect(() => {
    function keyHandler(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', keyHandler);
    }
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <section className={styles.orders}>
      <TableSearch
        placeholder='Поиск по заказам'
        inputValue={(e) => setInputValue(e.target.value)}
        handleInputClear={handleInputClear}
        value={inputValue}
      />
      <TableNavigation
        currentPage={currentPage}
        allPages={allPages}
        handleClickNext={() =>
          currentPage !== allPages - 1 && setCurrentPage(currentPage + 1)
        }
        handleClickPrev={() =>
          currentPage > 0 &&   setCurrentPage(currentPage - 1)
        }
        showPages={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setShowPages(Number(e.target.value))
        }
      />
      <OrderDescription />
      <p
        className={
          activeOrders
            ? `${styles.orders__null} ${styles.orders__null_active}`
            : `${styles.orders__null}`
        }
      >
        Здесь пока нет заказов
      </p>
      <ul className={styles.orders__items}>
        {orders?.map((item: Order) => (
          <OrderItem
            openPopup={openPopup}
            key={item.id}
            order={item.order_number}
            delivery={item.delivery_type}
            date={item.date}
            summa={item.total + ' ₽'}
            isPay={item.isPayed}
            item={item}
          />
        ))}
      </ul>
      <PopupOrders
        isOpen={isOpen}
        onClose={onClose}
        selectedOrder={selectedOrder}
        handleEditOrder={handleEditOrder}
      />
    </section>
  );
}

export default Orders;
