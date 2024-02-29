import React from 'react';
import styles from './TableSearch.module.scss';
import { ReactComponent as SearchIcon } from '../../assets/icons/en-searsh.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/en-cancel-fill.svg';

interface TableSearchProps {
  inputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputClear: () => void;
  placeholder: string
  value: string
}

function TableSearch({ inputValue, handleInputClear, placeholder, value }: TableSearchProps) {
  return (
    <section className={styles.search}>
      <SearchIcon
        className={`${styles.search__icon} ${styles.search__icon_search}`}
      />
      <input
        type='text'
        className={styles.search__input}
        value={value}
        placeholder={placeholder}
        onChange={inputValue}
      />
      <DeleteIcon
        className={`${styles.search__icon} ${styles.search__icon_cancel}`}
        onClick={handleInputClear}
      />
    </section>
  );
}

export default TableSearch;
