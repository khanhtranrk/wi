'use client'

import { useEffect, useMemo, useState } from 'react';
import { Tree } from './Tree';
import styles from './SectionExplorer.module.scss';
import { animated, a, useSpring } from '@react-spring/web';
import { ESectionExplorerAction, ISectionExplorerNode, ISectionExplorerTree } from './types';

// Props

export interface SectionExplorerProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  data: ISectionExplorerTree[];
  actionPopup?: 0 | 1;
  onActionPopupChanged?: (action: 0 | 1) => void;
  onItemChanged?: (node: ISectionExplorerNode<T>) => void;
  onItemAction?: (node: ISectionExplorerNode<T>, action: ESectionExplorerAction) => void;
}

// Components

export function SectionExplorer<T = any>({
  data,
  actionPopup,
  onActionPopupChanged,
  onItemChanged,
  onItemAction,
  className,
  ...props
}: Readonly<SectionExplorerProps>) {
  const [trees, setTrees] = useState<ISectionExplorerTree[]>(data);
  const [isActionPopupOpen, setActionPopupOpen] = useState<0 | 1>(0); // 0: close | 1: create

  const actionPopupAnimation = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isActionPopupOpen ? 88 : 0,
      opacity: isActionPopupOpen ? 1 : 0,
      y: isActionPopupOpen ? 0 : -40,
    },
  });

  function handleActionPopupCancelclick() {
    setActionPopupOpen(0);
    onActionPopupChanged && onActionPopupChanged(0);
  }

  useEffect(() => {
    setActionPopupOpen(actionPopup || 0);
  }, [actionPopup]);
  
  useEffect(() => {
    setTrees(data);
  }, [data]);

  const nodes = useMemo(() => {
    return data.filter((item) => item.parentNodeKey === null || item.parentNodeKey === undefined);
  }, [trees]);

  return (
    <div className={`${styles.sectionExplorer} ${className}`} {...props}>
      <div className={styles.trees}>
        <animated.div
          className={styles.actionPopup}
          style={{
            opacity: actionPopupAnimation.opacity,
            height: actionPopupAnimation.height,
          }}>
            <a.div className={styles.actionPopupContent} style={{ y: actionPopupAnimation.y }}>
              <div className={styles.actionPopupContentInputs}>
                {(isActionPopupOpen === 1) && (
                  <>
                    <input type="text" value={''}/>
                    <input type="color" value={'#fde68a'} />
                  </>
                )}
              </div>
              <div className={styles.actionPopupContentButtons}>
                  <button onClick={handleActionPopupCancelclick}>Cancel</button>
                  <button>Save</button>
              </div>
            </a.div>
        </animated.div>
        {nodes.map((item) => (
          <Tree<T>
            key={item.key}
            head={item}
            data={trees}
            onChanged={onItemChanged}
            onAction={onItemAction}
          />
        ))}
      </div>
    </div>
  );
}
