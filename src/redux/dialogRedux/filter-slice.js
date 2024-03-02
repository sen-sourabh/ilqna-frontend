import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    isOpen: false,
    searchInput: '',
    selectedCategory: [],
    selectedLanguage: [],
  },
  reducers: {
    openFilter: (state, action) => {
      state.isOpen = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = [...action.payload];
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = [...action.payload];
    },
  },
});

export const { openFilter, setSearchInput, setSelectedCategory, setSelectedLanguage } =
  filterSlice.actions;
export default filterSlice.reducer;
