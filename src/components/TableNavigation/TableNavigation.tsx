import React from 'react';
import styles from './TableNavigation.module.scss';
import arrowRight from '../../assets/icons/en-arrow-right.svg';
import { useLocation } from 'react-router-dom';

interface TableNavigationProps {
  currentPage: number;
  allPages: number;
  handleClickNext: () => void;
  handleClickPrev: () => void;
  showPages: (e: any) => void;
}

function TableNavigation({
  currentPage,
  allPages,
  handleClickNext,
  handleClickPrev,
  showPages,
}: TableNavigationProps) {
  const tableRoute = useLocation().pathname === '/clients';
  return (
    <div
      className={
        tableRoute ? `${styles.table} ${styles.table_clients}` : styles.table
      }
    >
      <p className={styles.table__text}>Показывать</p>
      <select className={styles.table__select} onChange={showPages}>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='30'>30</option>
      </select>
      <p className={styles.table__text}>Страница</p>
      <p className={styles.table__input}>{currentPage + 1}</p>
      <p className={styles.table__pages}>из {allPages}</p>
      <button className={styles.table__button} onClick={handleClickPrev}>
        <img src={arrowRight} alt='icon' className={styles.table__icon} />
      </button>
      <button className={styles.table__button} onClick={handleClickNext}>
        <img
          src={arrowRight}
          alt='icon'
          className={`${styles.table__icon} ${styles.table__icon_rotate}`}
        />
      </button>
    </div>
  );
}

export default TableNavigation;
