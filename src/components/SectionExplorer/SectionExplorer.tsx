'use client'

import { Tree, ITree } from './Tree';
import styles from './SectionExplorer.module.scss';
import { useEffect, useState } from 'react';

// Props

export interface SectionExplorerProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  data: ITree[];
  onItemClick?: (data: ITree<T>, event: React.MouseEvent<HTMLDivElement>) => void;
}

// Components

export function SectionExplorer({
  data,
  onItemClick,
  className,
  ...props
}: Readonly<SectionExplorerProps>) {
  const [trees, setTrees] = useState(data);

  useEffect(() => {
    setTrees(data);
  }, [data]);

  return (
    <div className={`${styles.sectionExplorer} ${className}`} {...props}>
      <div className={styles.trees}>
        {trees.map((item) => (
          <Tree
            key={item.key}
            data={item}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}
