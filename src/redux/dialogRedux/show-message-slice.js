import { createSlice } from "@reduxjs/toolkit";

const showMessageSlice = createSlice({
    name: 'show_message',
    initialState: {
        isOpen: false
    },
    reducers: {
        openShowMessage: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const { openShowMessage } = showMessageSlice.actions;
export default showMessageSlice.reducer;