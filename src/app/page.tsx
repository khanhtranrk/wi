import { MdEditor, TableOfContent } from '@/components';
import styles from './styles.module.scss';

// Data

const tableOfContent = [
  {
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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
    key: 'heading-1',
    title: 'Heading 1',
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

export default function Home() {
  return (
    <div className={`${styles['container']}`}>
      <TableOfContent className={`${styles['left-side']}`} data={tableOfContent} />
      <MdEditor markdown='Hello **world**!' />
    </div>
  );
}
