import React, { useState, useEffect, useRef } from 'react';
import styles from '../Actions/Actions.module.scss';
import TableNavigation from '../TableNavigation/TableNavigation.tsx';
import clients from '../../constants/clients.ts';
import ClientsDescription from '../ClientsDescription/ClientsDescription.tsx';
import ClientsItem from '../ClientsItem/ClientsItem.tsx';
import {
  ShowItemsValue,
  ProductList,
  ItemsDescription,
} from '../../contexts/ShowItemsValue';
import TableSearch from '../TableSearch/TableSearch.tsx';

function Clients() {
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState(1);
  const [showPages, setShowPages] = useState(10);
  const list = useRef(null);
  const description = useRef(null);
  const [showClients, setShowClients] = useState(clients);

  function handleInputClear() {
    setInputValue('');
  }

  let clientsClone: any[] = [];
  for (let i = 0; i < clients.length; i++) {
    clientsClone.push(clients[i]);
  }

  useEffect(() => {
    setShowClients(
      clientsClone.slice(
        currentPage * showPages,
        currentPage * showPages + showPages
      )
    );
  }, [clientsClone.length]);

  useEffect(() => {
    const validateClients = clients.filter(
      ({ name, lastName, email, phone }) => {
        const validateName =
          name !== null &&
          name.toLowerCase().includes(inputValue.toLowerCase());
        const validateLastName =
          lastName !== null &&
          lastName.toLowerCase().includes(inputValue.toLowerCase());
        const validateEmail =
          email !== null &&
          email.toLowerCase().includes(inputValue.toLowerCase());
        const validatePhone = phone !== null && phone.includes(inputValue);
        return (
          validateEmail || validateLastName || validateName || validatePhone
        );
      }
    );
    setShowClients(
      validateClients.slice(
        currentPage * showPages,
        currentPage * showPages + showPages
      )
    );
  }, [inputValue, showPages, currentPage]);

  useEffect(() => {
    const filteredClients = clients.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setAllPages(Math.ceil(filteredClients.length / showPages));
  }, [clientsClone.length, inputValue, showPages]);

  return (
    <ItemsDescription.Provider value={description}>
      <ShowItemsValue.Provider value={showPages}>
        <ProductList.Provider value={list}>
          <section className={`${styles.actions} ${styles.actions_clients}`}>
            <TableSearch
              inputValue={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              handleInputClear={() => handleInputClear()}
              placeholder='Поиск'
              value={inputValue}
            />
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
            <ClientsDescription description={description} />
            <ul
              className={
                styles.actions__items + ' ' + styles.actions__items_clients
              }
              ref={list}
            >
              {showClients?.map(({ name, lastName, phone, email }) => (
                <ClientsItem
                  key={name + ' ' + lastName + phone}
                  name={name + ' ' + lastName}
                  phone={phone}
                  email={email}
                />
              ))}
            </ul>
          </section>
        </ProductList.Provider>
      </ShowItemsValue.Provider>
    </ItemsDescription.Provider>
  );
}

export default Clients;
