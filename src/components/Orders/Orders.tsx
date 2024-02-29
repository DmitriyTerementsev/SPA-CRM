import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import TableSearch from '../TableSearch/TableSearch.tsx';
import TableNavigation from '../TableNavigation/TableNavigation.tsx';
import OrderDescription from '../OrderDescription/OrderDescription.tsx';
import OrderItem from '../OrderItem/OrderItem.tsx';
import PopupOrders from '../PopupOrders/PopupOrders.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/thunks/orderThunk.ts';
import {
  editOrderName,
  editOrderNumber,
} from '../../redux/actions/orderActions.ts';
import { AppDispatch, RootState } from '../../redux/store/store.ts';

function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const data: any = useSelector<RootState>((item) => {
    return item;
  });
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState(1);
  const [showPages, setShowPages] = useState(10);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeOrders, setActiveOrders] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const allOrders: any[] = data.order.orders;

  useEffect(() => {
    setOrders(allOrders);
  }, [allOrders]);

  const openPopup = (item: {
    id: string;
    delivery_type: string;
    total: string;
    isPayed: boolean;
    order_number: string;
    date: string;
    user: { name: string; lastName: string };
  }) => {
    if (isOpen === false) {
      setOpen(true);
      setSelectedOrder(item);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    orders.length === 0 ? setActiveOrders(true) : setActiveOrders(false);
  }, [inputValue, orders]);

  const handleInputClear = () => {
    setInputValue('');
  };

  useEffect(() => {
    setOrders(
      allOrders.slice(
        currentPage * showPages,
        currentPage * showPages + showPages
      )
    );
  }, [currentPage, showPages, allOrders]);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setAllPages(Math.ceil(allOrders.length / showPages));
  }, [allOrders, showPages]);

  useEffect(() => {
    setOrders(
      allOrders
        .filter(
          (item: { user: { name: string; lastName: string } }) =>
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
        )
        .slice(currentPage * showPages, currentPage * showPages + showPages)
    );
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
    dispatch(editOrderName(name, lastName, selectedOrder.id));
    dispatch(editOrderNumber(userOrder, selectedOrder.id));
    onClose();
  };

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
          currentPage === allPages - 1 ? null : setCurrentPage(currentPage + 1)
        }
        handleClickPrev={() =>
          currentPage > 0 ? setCurrentPage(currentPage - 1) : null
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
        {orders?.map(
          (item: {
            id: string;
            delivery_type: string;
            total: string;
            isPayed: boolean;
            order_number: string;
            date: string;
            user: { name: string; lastName: string };
          }) => (
            <OrderItem
              openPopup={openPopup}
              key={item.id}
              name={item.user.name + ' ' + item.user.lastName}
              order={item.order_number}
              delivery={item.delivery_type}
              date={item.date}
              summa={item.total + ' ₽'}
              isPay={item.isPayed}
              item={item}
            />
          )
        )}
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
