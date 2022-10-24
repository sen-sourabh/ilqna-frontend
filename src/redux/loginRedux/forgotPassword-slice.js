import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        isForm: true,
    },
    reducers: {
        changeForm: (state, action) => {
            state.isForm = action.payload
        }
    }
})

export const { changeForm } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;