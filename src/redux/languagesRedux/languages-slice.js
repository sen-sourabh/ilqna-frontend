import { createSlice } from '@reduxjs/toolkit';

const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    allLanguagesData: [],
  },
  reducers: {
    setAllLanguagesData: (state, action) => {
      state.allLanguagesData = action.payload;
    },
  },
});

export const { setAllLanguagesData } = languagesSlice.actions;
export default languagesSlice.reducer;
