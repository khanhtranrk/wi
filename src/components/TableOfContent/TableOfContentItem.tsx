'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './TableOfContentItem.module.scss';
import { TfiAngleDown, TfiAngleRight } from "react-icons/tfi";
import useMeasure from 'react-use-measure'
import { useSpring, animated, a } from '@react-spring/web';

// Interface

export interface ITableOfContentItem<T = any> {
  key: string;
  title: string;
  data?: T;
  color?: string;
  childrens?: ITableOfContentItem[];
}


// Props

export interface TableOfContentItemProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  data: ITableOfContentItem<T>;
  onClick?: (data: ITableOfContentItem<T>, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// Component

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function TableOfContentItem({
  data,
  className,
  onClick,
  ...props
}: Readonly<TableOfContentItemProps>) {
  className = className || '';
  const [isOpen, setOpen] = useState(false)
  const previous = usePrevious(isOpen)
  const [ref, { height: viewHeight }] = useMeasure()
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : -40,
    },
  })

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setOpen(!isOpen)

    if (onClick) {
      onClick(data, event);
    }
  }

  return (
    <div className={`${styles['table-of-content-item']}`} style={{backgroundColor: data.color || 'transparent'}}>
      <div style={{display: 'flex', flexDirection: 'row', gap: 8, padding: 8}} onClick={handleClick}>
        <div className={`${styles['icon']}`} style={{opacity: data.childrens && data.childrens.length > 0 ? 1 : 0 }} onClick={() => setOpen(!isOpen)} >
          {isOpen ? <TfiAngleDown height={24} width={24} /> : <TfiAngleRight height={24} width={24} />}
        </div>
        <p className={`${styles['title']}`}>{data.title}</p>
      </div>
      {data.childrens && data.childrens.length > 0 && (
        <animated.div
          className={`${styles['content']}`}
          style={{
            opacity,
            height: isOpen && previous === isOpen ? height : height,
          }}>
            <a.div ref={ref} style={{ y }}>
              {data.childrens.map((item) => <TableOfContentItem data={item} />)}
            </a.div>
        </animated.div>
      )}
    </div>
  )
}
