import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false,
        userData: []
    },
    reducers: {
        isLogin: (state, action) => {
            state.isLogin = action.payload
        }
    }
})

export const { isLogin } = loginSlice.actions;
export default loginSlice.reducer;