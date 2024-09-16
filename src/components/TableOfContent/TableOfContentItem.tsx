'use client'

import styles from './TableOfContentItem.module.scss';

// Interface

export interface ITableOfContentItem<T = any> {
  key: string;
  title: string;
  data?: T;
  childrens?: ITableOfContentItem[];
}


// Props

export interface TableOfContentItemProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  data: ITableOfContentItem<T>;
  onClick?: (data: ITableOfContentItem<T>, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// Component

export function TableOfContentItem({
  data,
  className,
  onClick,
  ...props
}: Readonly<TableOfContentItemProps>) {
  className = className || '';

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (onClick) {
      onClick(data, event);
    }
  }

  return (
    <div key={data.key} className={`${styles['table-of-content-item']} ${className}`} onClick={handleClick} {...props}>
      <p>{data.title}</p>

      {data.childrens && (
        <div className={styles['spine-item-childrens']}>
            {data.childrens.map((item) => <TableOfContentItem data={item} />)}
        </div>
      )}
    </div>
  );
}
