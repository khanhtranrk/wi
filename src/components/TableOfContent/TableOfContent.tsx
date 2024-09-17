'use client'

import { TableOfContentItem, ITableOfContentItem } from './TableOfContentItem';
import styles from './TableOfContent.module.scss';
import { TfiPlus } from "react-icons/tfi";

// Props

export interface TableOfContentProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  data: ITableOfContentItem[];
  onItemClick?: (data: ITableOfContentItem<T>, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// Components

export function TableOfContent({
  data,
  onItemClick,
  className,
  ...props
}: Readonly<TableOfContentProps>) {
  return (
    <div className={`${styles['table-of-content']} ${className}`} {...props}>
      <div className={`${styles['top']}`}>
        <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', fontWeight: 'bold'}}>
          Notebook 1
        </div>
        <button className={`${styles['add-button']}`}>
          <TfiPlus height={32} width={32}/>
        </button>
      </div>
      <div className={`${styles['table']}`}>
        {data.map((item) => <TableOfContentItem data={item} onClick={onItemClick} />)}
      </div>
    </div>
  );
}
