import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISectionExplorerTree } from '@/components';

interface NotebooksState {
  currentNotebook: number | null;
  explorerTrees: ISectionExplorerTree[];
}

const initialState: NotebooksState = {
  currentNotebook: 0,
  explorerTrees: [
    {
      key: 1,
      title: 'Daily Notes',
      color: 'rgb(254 202 202)',
      parentNodeKey: null,
    },
    {
      key: 11,
      title: '19-09-2024',
      color: 'rgb(254 202 255)',
      parentNodeKey: 1,
    },
    {
      key: 12,
      title: '18-09-2024',
      parentNodeKey: 1,
    },
    {
      key: 13,
      title: '17-09-2024',
      parentNodeKey: 1,
    },
    {
      key: 13,
      title: '16-09-2024',
      parentNodeKey: 1,
    },
    {
      key: 14,
      title: '15-09-2024',
      parentNodeKey: 1,
    },
    {
      key: 2,
      title: 'Weekly Notes',
      color: 'rgb(254 215 170)',
      parentNodeKey: null,
    },
    {
      key: 21,
      title: '19-09-2024',
      color: 'rgb(254 202 255)',
      parentNodeKey: 2,
    },
    {
      key: 22,
      title: '18-09-2024',
      parentNodeKey: 2,
    },
    {
      key: 23,
      title: '17-09-2024',
      parentNodeKey: 2,
    },
    {
      key: 23,
      title: '16-09-2024',
      parentNodeKey: 2,
    },
    {
      key: 24,
      title: '15-09-2024',
      parentNodeKey: 2,
    },
    {
      key: 3,
      title: 'Monthly Notes',
      color: 'rgb(253 230 138)',
      parentNodeKey: null,
    },
    {
      key: 31,
      title: '09-2024',
      color: 'rgb(254 202 255)',
      parentNodeKey: 3,
    },
    {
      key: 32,
      title: '08-2024',
      parentNodeKey: 3,
    },
    {
      key: 33,
      title: '07-2024',
      parentNodeKey: 3,
    },
    {
      key: 33,
      title: '06-2024',
      parentNodeKey: 3,
    },
    {
      key: 34,
      title: '05-2024',
      parentNodeKey: 3,
    },
    {
      key: 4,
      title: 'Yearly Notes',
      color: 'rgb(254 240 138)',
      parentNodeKey: null,
    },
    {
      key: 41,
      title: '2024',
      color: 'rgb(254 202 255)',
      parentNodeKey: 4,
    },
    {
      key: 42,
      title: '2023',
      parentNodeKey: 4,
    },
    {
      key: 43,
      title: '2022',
      parentNodeKey: 4,
    },
    {
      key: 43,
      title: '2021',
      parentNodeKey: 4,
    },
    {
      key: 44,
      title: '2020',
      parentNodeKey: 4,
    },
  ]
};

export const notebooksSlice = createSlice({
  name: 'notebooks',
  initialState,
  reducers: {
    setExplorerTrees: (state, action: PayloadAction<ISectionExplorerTree[]>) => {
      state.explorerTrees = action.payload;
    }
  },
});

export const { setExplorerTrees } = notebooksSlice.actions;

export default notebooksSlice.reducer;
