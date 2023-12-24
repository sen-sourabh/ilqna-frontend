import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    allCategoriesData: [],
  },
  reducers: {
    setAllCategoriesData: (state, actions) => {
      state.allCategoriesData = actions.payload;
    },
  },
});

export const { setAllCategoriesData } = categoriesSlice.actions;
export default categoriesSlice.reducer;
