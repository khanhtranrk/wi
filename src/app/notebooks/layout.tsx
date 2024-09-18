'use client'

import { SectionExplorer, ITree } from '@/components';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

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
  const [pages, setPages] = useState(tableOfContent);

  useEffect(() => {
    console.log("begin | it changed");
    console.log(pages);
    console.log("end   | it changed");
  }, [pages]);

  return (
    <div className={styles.notebooks}>
      <div className={styles.leftSide}>
        <div className={styles.topBar}>
          <button style={{height: 44, width: 44}} onClick={() => {
            setPages([...pages, {
              key: 'New Note',
              title: 'New Note',
              color: 'rgb(254 240 138)',
              childrens: [],
            }]);
          }}>+</button>
          <button style={{height: 44, width: 44}} onClick={() => {
            console.log(pages);
          }}>v</button>
        </div>
        <div className={styles.explorer}>
          <SectionExplorer data={pages} />
        </div>
      </div>
      <div className={styles.rightSide}>
        {children}
      </div>
    </div>
  );
}
