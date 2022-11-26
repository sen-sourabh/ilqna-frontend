import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        isOpen: false,
        severity: 'success',
        message: ''
    },
    reducers: {
        isOpen: (state, action) => {
            state.isOpen = action.payload
        },
        prepareSnackbar: (state, action) => {
            state.isOpen = action.payload.open;
            state.severity = action.payload.severity;
            state.message = action.payload.message;
        },
        resetSnackbar: (state) => {
            console.log(state)
            state.isOpen = false;
            state.severity = 'success';
            state.message = '';
        }
    }
})

export const { isOpen, prepareSnackbar, resetSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;