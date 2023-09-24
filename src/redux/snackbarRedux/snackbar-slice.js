import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    isOpen: false,
    severity: 'success',
    message: 'All Good.',
  },
  reducers: {
    isOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    prepareSnackbar: (state, action) => {
      state.isOpen = action.payload.open;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    resetSnackbar: (state) => {
      state.isOpen = false;
      // state.severity = '';
      // state.message = '';
    },
  },
});

export const { isOpen, prepareSnackbar, resetSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
