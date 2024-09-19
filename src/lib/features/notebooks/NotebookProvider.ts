import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPage {
  id?: number;
  title: string;
  content: string;
}

interface INotebook {
  id?: number;
  name: string;
  pages: IPage[];
}

interface NotebooksState {
  currentNotebook: number | null;
  notebooks: 
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
