'use client'

import { TableOfContentItem, ITableOfContentItem } from './TableOfContentItem';
import styles from './TableOfContent.module.scss';

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
      {data.map((item) => <TableOfContentItem data={item} onClick={onItemClick} />)}
    </div>
  );
}
