import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISectionExplorerTree } from '@/components';

interface NotebooksState {
  currentNotebook: number | null;
  explorerTrees: ISectionExplorerTree[];
}

const initialState: NotebooksState = {
  currentNotebook: 0,
  explorerTrees: []
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
