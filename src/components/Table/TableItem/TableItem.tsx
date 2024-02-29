import React from 'react';
import styles from './TableItem.module.scss';

interface TableProps {
  children: React.JSX.Element;
}

function TableItem({ children }: TableProps) {
  return <li className={styles.item}>{children}</li>;
}

export default TableItem;
