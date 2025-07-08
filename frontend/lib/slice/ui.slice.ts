import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/lib/create-app-slice';
import { SortOrder } from './videos-api.slice';

interface UIState {
  sortBy: SortOrder;
}

const initialState: UIState = {
  sortBy: 'newest',
};

export const uiSlice = createAppSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortOrder>) => {
      state.sortBy = action.payload;
    },
  },
  selectors: {
    selectSortBy: (state) => state.sortBy,
  },
});

export const { setSortBy } = uiSlice.actions;
export const { selectSortBy } = uiSlice.selectors;
