import { createSlice } from "@reduxjs/toolkit";

const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        isOpen: false
    },
    reducers: {
        openAbout: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const { openAbout } = aboutSlice.actions;
export default aboutSlice.reducer;