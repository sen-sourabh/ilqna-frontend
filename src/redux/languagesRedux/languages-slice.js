import { createSlice } from '@reduxjs/toolkit';

const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    allLanguagesData: [],
  },
  reducers: {
    setAllLanguagesData: (state, actions) => {
      state.allLanguagesData = actions.payload;
    },
  },
});

export const { setAllLanguagesData } = languagesSlice.actions;
export default languagesSlice.reducer;
