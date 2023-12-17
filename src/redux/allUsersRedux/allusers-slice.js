import { createSlice } from '@reduxjs/toolkit';

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    allUsersData: [],
  },
  reducers: {
    setAllUsersData: (state, actions) => {
      state.allUsersData = actions.payload;
    },
  },
});

export const { setAllUsersData } = allUsersSlice.actions;
export default allUsersSlice.reducer;
