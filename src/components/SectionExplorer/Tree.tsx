'use client'

import { useEffect, useState, MouseEvent } from 'react';
import styles from './Tree.module.scss';
import useMeasure from 'react-use-measure'
import { useSpring, animated, a } from '@react-spring/web';
import { LuMoreHorizontal, LuPen, LuPlus, LuTrash } from 'react-icons/lu';

// Interface

export interface ITree<T = any> {
  key: string;
  title: string;
  data?: T;
  color?: string;
  childrens?: ITree[];
}


// Props

export interface TreeProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  data: ITree<T>;
  onClick?: (data: ITree<T>, event: React.MouseEvent<HTMLDivElement>) => void;
}

// Component

export function Tree({
  data,
  className,
  onClick,
  ...props
}: Readonly<TreeProps>) {
  className = className || '';

  const [tree, setTree] = useState(data);
  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [ref, { height: viewHeight }] = useMeasure();

  const contentAnimation = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : -40,
    },
  });

  const menuAnimation = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isMenuOpen ? 40 : 0,
      opacity: isMenuOpen ? 1 : 0,
      y: isMenuOpen ? 0 : -40,
    },
  });

  useEffect(() => {
    setTree(data);
  }, [data]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    setMenuOpen(false)
    setOpen(!isOpen)

    if (onClick) {
      onClick(data, event);
    }
  }

  function handleMenuClick(event: MouseEvent<HTMLButtonElement>) {
    setOpen(false)
    setMenuOpen(!isMenuOpen)
  };

  function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setMenuOpen(!isMenuOpen)
  }

  return (
    <div className={`${styles.tree} ${className}`} style={{backgroundColor: tree.color || 'transparent'}}>

      <div className={styles.node}>
        <div className={styles.display}>
          <div className={`${styles.title}`} onClick={handleClick} onContextMenu={handleContextMenu}>
            <p>{tree.title}</p>
          </div>
          <button className={styles.moreButton} onClick={handleMenuClick}>
            <LuMoreHorizontal height={24} width={24} />
          </button>
        </div>
        <animated.div
          className={styles.menu}
          style={{
            opacity: menuAnimation.opacity,
            height: menuAnimation.height,
          }}>
            <a.div className={styles.menuContent} style={{ y: menuAnimation.y }}>
              <button className={styles.optionButton}>
                <LuPlus height={24} width={24} />
              </button>
              <button className={styles.optionButton}>
                <LuPen height={24} width={24} />
              </button>
              <button className={styles.optionButton}>
                <LuTrash height={24} width={24} />
              </button>
            </a.div>
        </animated.div>
      </div>

      {tree.childrens && tree.childrens.length > 0 && (
        <animated.div
          className={styles.content}
          style={{
            opacity: contentAnimation.opacity,
            height: contentAnimation.height,
          }}>
            <a.div ref={ref} style={{ y: contentAnimation.y }}>
              {tree.childrens.map((item) => (
                <Tree
                  data={item}
                  onClick={onClick}
                />
              ))}
            </a.div>
        </animated.div>
      )}
    </div>
  )
}
