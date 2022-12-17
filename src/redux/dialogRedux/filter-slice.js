import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        isOpen: false
    },
    reducers: {
        openFilter: (state, action) => {
            console.log("handleCloseFilter: ", state, action)
            state.isOpen = action.payload
        }
    }
})

export const { openFilter } = filterSlice.actions;
export default filterSlice.reducer;