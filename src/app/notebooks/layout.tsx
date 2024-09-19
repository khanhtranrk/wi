'use client'

import { useEffect, useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SectionExplorer, ITree } from '@/components';
import styles from './styles.module.scss';
import { LuPlus } from 'react-icons/lu';

// Data

const tableOfContent: ITree[] = [
  {
    key: 'Daily Notes',
    title: 'Daily Notes',
    color: 'rgb(254 202 202)',
    childrens: [
      {
        key: '19-09-2024',
        title: '19-09-2024',
        color: 'rgb(254 202 255)',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            color: 'rgb(254 202 255)',
            childrens: [
              {
                key: 'heading-4',
                title: 'Heading 4',
                color: 'rgb(254 202 255)',
                childrens: [],
              },
            ],
          },
        ],
      },
      {
        key: '18-09-2024',
        title: '18-09-2024',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            childrens: [
              {
                key: 'heading-4',
                title: 'Heading 4',
                childrens: [],
              },
            ],
          },
        ],
      },
      {
        key: '17-09-2024',
        title: '17-09-2024',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            childrens: [
              {
                key: 'heading-4',
                title: 'Heading 4',
                childrens: [],
              },
            ],
          },
        ],
      },
      {
        key: '16-09-2024',
        title: '16-09-2024',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            childrens: [
              {
                key: 'heading-4',
                title: 'Heading 4',
                childrens: [],
              },
            ],
          },
        ],
      },
      {
        key: '15-09-2024',
        title: '15-09-2024',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            childrens: [
              {
                key: 'heading-4',
                title: 'Heading 4',
                childrens: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'Weekly Notes',
    title: 'Weekly Notes',
    color: 'rgb(254 215 170)',
    childrens: [
      {
        key: 'heading-2',
        title: 'Heading 2',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            childrens: [],
          },
        ],
      },
    ],
  },
  {
    key: 'Monthly Notes',
    title: 'Monthly Notes',
    color: 'rgb(253 230 138)',
    childrens: [
      {
        key: 'heading-2',
        title: 'Heading 2',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            childrens: [],
          },
        ],
      },
    ],
  },
  {
    key: 'Yearly Notes',
    title: 'Yearly Notes',
    color: 'rgb(254 240 138)',
    childrens: [
      {
        key: 'heading-2',
        title: 'Heading 2',
        childrens: [
          {
            key: 'heading-3',
            title: 'Heading 3',
            childrens: [],
          },
        ],
      },
    ],
  },
];

export default function Notebooks({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const [pages, setPages] = useState(tableOfContent);
  const [isActionPopupOpen, setActionPopupOpen] = useState<0 | 1>(0); // 0: close | 1: create

  useEffect(() => {
    console.log("begin | it changed");
    console.log(pages);
    console.log("end   | it changed");
  }, [pages]);

  function handleSectionExplorerItemClick(node: ITree, event: MouseEvent<HTMLDivElement>) {
    router.push(`/notebooks/1/pages/${node.key}`)
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
            data={pages}
            onItemClick={handleSectionExplorerItemClick}
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
