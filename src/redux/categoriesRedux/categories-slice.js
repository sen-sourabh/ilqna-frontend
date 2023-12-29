import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    allCategoriesData: [],
  },
  reducers: {
    setAllCategoriesData: (state, action) => {
      state.allCategoriesData = action.payload;
    },
  },
});

export const { setAllCategoriesData } = categoriesSlice.actions;
export default categoriesSlice.reducer;
