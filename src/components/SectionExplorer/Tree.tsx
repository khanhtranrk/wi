'use client'

import { useEffect, useState, MouseEvent } from 'react';
import { useSpring, animated, a } from '@react-spring/web';
import { LuMoreHorizontal, LuPen, LuPlus, LuTrash } from 'react-icons/lu';
import useMeasure from 'react-use-measure'
import styles from './Tree.module.scss';

// Interface

export interface ITree<T = any> {
  key?: string;
  title: string;
  color?: string;
  childrens?: ITree[];
  data?: T;
}


// Props

export interface TreeProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  data: ITree<T>;
  onClick?: (node: ITree<T>, event: React.MouseEvent<HTMLDivElement>) => void;
  onCreate?: (parentNode: ITree<T>, node: ITree<T>) => void;
}

// Component

export function Tree<T = any>({
  data,
  className,
  onClick
}: Readonly<TreeProps<T>>) {
  className = className || '';

  const [tree, setTree] = useState<ITree>(data);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const [isActionPopupOpen, setActionPopupOpen] = useState<0 | 1 | 2 | 3>(0); // 0: close | 1: create | 2: edit | 3: delete
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

  const actionPopupAnimation = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isActionPopupOpen ? 88 : 0,
      opacity: isActionPopupOpen ? 1 : 0,
      y: isActionPopupOpen ? 0 : -40,
    },
  });

  useEffect(() => {
    setTree(data);
  }, [data]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    setMenuOpen(false)
    setActionPopupOpen(0)
    setOpen(!isOpen)

    if (onClick) {
      onClick(data, event);
    }
  }

  function handleMenuClick() {
    setOpen(false)
    setActionPopupOpen(0)
    setMenuOpen(!isMenuOpen)
  };

  function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setOpen(false)
    setActionPopupOpen(0)
    setMenuOpen(!isMenuOpen)
  }

  function handleActionPopupClick(action: 0 | 1 | 2 | 3) {
    setMenuOpen(false)
    setOpen(action === 1)
    setActionPopupOpen(action === isActionPopupOpen ? 0 : action)
  }

  function handleActionPopupCancelclick() {
    setOpen(false)
    setMenuOpen(false)
    setActionPopupOpen(0)
  }

  return (
    <div className={`${styles.tree} ${className}`} style={{backgroundColor: tree.color || 'transparent'}}>

      <div className={styles.node}>
        <div className={styles.display}>
          <div className={`${styles.title}`} onClick={handleClick} onContextMenu={handleContextMenu}>
            <p>{tree.title}</p>
          </div>
          <button className={styles.moreButton} onClick={handleMenuClick}>
            <LuMoreHorizontal size={14} />
          </button>
        </div>

        <animated.div
          className={styles.menu}
          style={{
            opacity: menuAnimation.opacity,
            height: menuAnimation.height,
          }}>
            <a.div className={styles.menuContent} style={{ y: menuAnimation.y }}>
              <button className={styles.optionButton} onClick={() => handleActionPopupClick(1)}>
                <LuPlus size={14} />
              </button>
              <button className={styles.optionButton} onClick={() => handleActionPopupClick(2)}>
                <LuPen size={14} />
              </button>
              <button className={styles.optionButton} onClick={() => handleActionPopupClick(3)}>
                <LuTrash size={14} />
              </button>
            </a.div>
        </animated.div>

        <animated.div
          className={styles.actionPopup}
          style={{
            opacity: actionPopupAnimation.opacity,
            height: actionPopupAnimation.height,
          }}>
            <a.div className={styles.actionPopupContent} style={{ y: actionPopupAnimation.y }}>
              <div className={styles.actionPopupContentInputs}>
                {(isActionPopupOpen === 1 || isActionPopupOpen === 2) && (
                  <>
                    <input type="text" value={isActionPopupOpen === 1 ? '' : tree.title}/>
                    <input type="color" value={isActionPopupOpen === 1 ? '#fde68a' : (tree.color || '#000000')} />
                  </>
                )}
                {(isActionPopupOpen === 3) && (
                  <p>Do you want to delete it?</p>
                )}
              </div>
              <div className={styles.actionPopupContentButtons}>
                {(isActionPopupOpen === 1 || isActionPopupOpen === 2) && (
                  <>
                    <button onClick={handleActionPopupCancelclick}>Cancel</button>
                    <button>Save</button>
                  </>
                )}
                {(isActionPopupOpen === 3) && (
                  <>
                    <button onClick={handleActionPopupCancelclick}>No</button>
                    <button>Yes</button>
                  </>
                )}
              </div>
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
