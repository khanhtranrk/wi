import { MdEditor, TableOfContent } from '@/components';
import styles from './styles.module.scss';

// Data

const tableOfContent = [
  {
    key: 'Daily Notes',
    title: 'Daily Notes',
    color: 'rgb(254 202 202)',
    childrens: [
      {
        key: '19-09-2024',
        title: '19-09-2024',
        color: '',
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

export default function Home() {
  return (
    <div className={`${styles['container']}`}>
      <TableOfContent className={`${styles['left-side']}`} data={tableOfContent} />
      <MdEditor markdown='Hello **world**!' />
    </div>
  );
}
