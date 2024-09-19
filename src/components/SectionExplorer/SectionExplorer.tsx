'use client'

import { useEffect, useState } from 'react';
import { Tree, ITree } from './Tree';
import styles from './SectionExplorer.module.scss';
import { animated, a, useSpring } from '@react-spring/web';

// Props

export interface SectionExplorerProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  data: ITree[];
  actionPopup?: 0 | 1;
  onActionPopupChanged?: (action: 0 | 1) => void;
  onItemClick?: (data: ITree<T>, event: React.MouseEvent<HTMLDivElement>) => void;
}

// Components

export function SectionExplorer<T = any>({
  data,
  actionPopup,
  onActionPopupChanged,
  onItemClick,
  className,
  ...props
}: Readonly<SectionExplorerProps>) {
  const [trees, setTrees] = useState(data);
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
        {trees.map((item) => (
          <Tree<T>
            key={item.key}
            data={item}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}
