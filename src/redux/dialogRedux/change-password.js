import { createSlice } from '@reduxjs/toolkit';

const changePasswordSlice = createSlice({
  name: 'change-password',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openChangePassword: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { openChangePassword } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
