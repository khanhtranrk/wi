'use client'

import { useEffect, useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ESectionExplorerAction, SectionExplorer } from '@/components';
import styles from './styles.module.scss';
import { LuPlus } from 'react-icons/lu';
import { ISectionExplorerNode } from '@/components';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setExplorerTrees } from '@/lib/features/notebooks/notebookSlice';

export default function Notebooks({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const trees = useAppSelector((state) => state.notebooks.explorerTrees);
  const dispatch = useAppDispatch();
  const [isActionPopupOpen, setActionPopupOpen] = useState<0 | 1>(0); // 0: close | 1: create

  function handleSectionExplorerItemChanged(node: ISectionExplorerNode) {
    dispatch(setExplorerTrees(trees.map((item) => item.key === node.key ? node : item)));

    if (node.isExpanded) {
      router.push(`/notebooks/1/pages/${node.key}`)
    }
  }

  function handleSectionExplorerItemAction(node: ISectionExplorerNode, action: ESectionExplorerAction) {
    if (action === ESectionExplorerAction.View) {
      router.push(`/notebooks/1/pages/${node.key}/pages`)
    }
  }

  return (
    <div className={styles.notebooks}>
      <div className={styles.leftSide}>
        <div className={styles.topBar}>
          <button style={{height: 44, width: 44}} onClick={() => {
            setActionPopupOpen(isActionPopupOpen === 1 ? 0 : 1);
          }}>
            <LuPlus size={24} />
          </button>
        </div>
        <div className={styles.explorer}>
          <SectionExplorer
            data={trees}
            onItemChanged={handleSectionExplorerItemChanged}
            onItemAction={handleSectionExplorerItemAction}
            actionPopup={isActionPopupOpen}
            onActionPopupChanged={(action) => setActionPopupOpen(action)}
          />
        </div>
      </div>
      <div className={styles.rightSide}>
        {children}
      </div>
    </div>
  );
}
