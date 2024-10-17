'use client'

import { useEffect, useState, MouseEvent, useMemo } from 'react';
import { useSpring, animated, a } from '@react-spring/web';
import { LuLayoutList, LuMoreHorizontal, LuPen, LuPlus, LuTrash } from 'react-icons/lu';
import useMeasure from 'react-use-measure'
import styles from './Tree.module.scss';
import { ESectionExplorerAction, ISectionExplorerNode, ISectionExplorerTree } from './types';

// Props

export interface TreeProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  head: ISectionExplorerNode<T>;
  data: ISectionExplorerTree<T>[];
  onChanged?: (node: ISectionExplorerNode) => void;
  onAction?: (node: ISectionExplorerNode, action: ESectionExplorerAction) => void;
}

// Component

export function Tree<T = any>({
  head,
  data,
  onChanged,
  onAction,
  className,
}: Readonly<TreeProps<T>>) {
  className = className || '';

  const [node, setNode] = useState<ISectionExplorerTree>(head);
  const [trees, setTrees] = useState<ISectionExplorerTree[]>(data);

  const [ref, { height: viewHeight }] = useMeasure();
  const contentAnimation = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: node.isExpanded ? viewHeight : 0,
      opacity: node.isExpanded ? 1 : 0,
      y: node.isExpanded ? 0 : -40,
    },
  });
  const menuAnimation = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: node.isMenuOpen ? 40 : 0,
      opacity: node.isMenuOpen ? 1 : 0,
      y: node.isMenuOpen ? 0 : -40,
    },
  });
  const actionPopupAnimation = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: node.isActionPopupOpen ? 88 : 0,
      opacity: node.isActionPopupOpen ? 1 : 0,
      y: node.isActionPopupOpen ? 0 : -40,
    },
  });

  function handleClick() {
    setNode({
      ...node,
      isExpanded: !node.isExpanded,
      isMenuOpen: false,
      isActionPopupOpen: 0,
    });

    onChanged && onChanged({
      ...node,
      isExpanded: !node.isExpanded,
      isMenuOpen: false,
      isActionPopupOpen: 0,
    });
  }

  function handleMenuClick() {
    setNode({
      ...node,
      isExpanded: false,
      isMenuOpen: !node.isMenuOpen,
      isActionPopupOpen: 0,
    });

    onChanged && onChanged({
      ...node,
      isExpanded: false,
      isMenuOpen: !node.isMenuOpen,
      isActionPopupOpen: 0,
    });
  };

  function handleContextMenu(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setNode({
      ...node,
      isExpanded: false,
      isMenuOpen: !node.isMenuOpen,
      isActionPopupOpen: 0,
    });

    onChanged && onChanged({
      ...node,
      isExpanded: false,
      isMenuOpen: !node.isMenuOpen,
      isActionPopupOpen: 0,
    });
  }

  function handleActionPopupClick(action: ESectionExplorerAction) {
    setNode({
      ...node,
      isExpanded: action === 1,
      isMenuOpen: false,
      isActionPopupOpen: action === node.isActionPopupOpen ? 0 : action,
    });

    onChanged && onChanged({
      ...node,
      isExpanded: action === 1,
      isMenuOpen: false,
      isActionPopupOpen: action === node.isActionPopupOpen ? 0 : action,
    });
  }

  function handleActionPopupCancelclick() {
    setNode({
      ...node,
      isExpanded: false,
      isMenuOpen: false,
      isActionPopupOpen: 0,
    });

    onChanged && onChanged({
      ...node,
      isExpanded: false,
      isMenuOpen: false,
      isActionPopupOpen: 0,
    });
  }

  function handleActionPopupSaveclick() {
    if (node.isActionPopupOpen === 1) {
      onAction && onAction(node, ESectionExplorerAction.Add);
      return
    }

    if (node.isActionPopupOpen === 2) {
      onAction && onAction(node, ESectionExplorerAction.Edit);
      return
    }
  }

  useEffect(() => {
    setTrees(data);
  }, [data]);

  useEffect(() => {
    setNode(head);
  }, [head]);

  const nodes = useMemo(() => {
    return trees.filter((item) => item.parentNodeKey === node.key);
  }, [trees, node]);

  return (
    <div className={`${styles.tree} ${className}`} style={{backgroundColor: node.color || 'transparent'}}>

      <div className={styles.node}>
        <div className={styles.display}>
          <div className={`${styles.title}`} onClick={handleClick} onContextMenu={handleContextMenu}>
            <p>{node.title}</p>
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
              <button className={styles.optionButton}>
                <LuLayoutList size={14} onClick={() => onAction && onAction(node, ESectionExplorerAction.View)}/>
              </button>
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
                {(node.isActionPopupOpen === 1 || node.isActionPopupOpen === 2) && (
                  <>
                    <input type="text" value={node.isActionPopupOpen === 1 ? '' : node.title} onChange={e => setNode({...node, title: e.target.value})}/>
                    <input type="color" value={node.isActionPopupOpen === 1 ? '#fde68a' : (node.color || '#000000')} onChange={e => setNode({...node, color: e.target.value})} />
                  </>
                )}
                {(node.isActionPopupOpen === 3) && (
                  <p>Do you want to delete it?</p>
                )}
              </div>
              <div className={styles.actionPopupContentButtons}>
                {(node.isActionPopupOpen === 1 || node.isActionPopupOpen === 2) && (
                  <>
                    <button onClick={handleActionPopupCancelclick}>Cancel</button>
                    <button onClick={handleActionPopupSaveclick}>Save</button>
                  </>
                )}
                {(node.isActionPopupOpen === 3) && (
                  <>
                    <button onClick={handleActionPopupCancelclick}>No</button>
                    <button>Yes</button>
                  </>
                )}
              </div>
            </a.div>
        </animated.div>

      </div>

      {nodes && nodes.length > 0 && (
        <animated.div
          className={styles.content}
          style={{
            opacity: contentAnimation.opacity,
            height: contentAnimation.height,
          }}>
            <a.div ref={ref} style={{ y: contentAnimation.y }}>
              {nodes.map((item) => (
                <Tree
                  head={item}
                  data={trees}
                  onChanged={onChanged}
                  onAction={onAction}
                />
              ))}
            </a.div>
        </animated.div>
      )}
    </div>
  )
}
