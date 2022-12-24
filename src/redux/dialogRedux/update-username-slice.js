import { createSlice } from "@reduxjs/toolkit";

const updateUsernameSlice = createSlice({
    name: 'update-username',
    initialState: {
        isOpen: false
    },
    reducers: {
        openUsername: (state, action) => {
            state.isOpen = action.payload
        }
    }
})

export const { openUsername } = updateUsernameSlice.actions;
export default updateUsernameSlice.reducer;