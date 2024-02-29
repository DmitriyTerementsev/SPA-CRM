import React from 'react';
import styles from './TableDescription.module.scss';

interface TableProps {
  children: React.JSX.Element;
}

function TableDescription({ children }: TableProps) {
  return <div className={`${styles.description}`}>{children}</div>;
}

export default TableDescription;
