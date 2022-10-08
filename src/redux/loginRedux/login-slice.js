import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: localStorage.isLogin ? true : false,
        userData: localStorage.userData ? JSON.parse(localStorage.userData) : null
    },
    reducers: {
        isLogin: (state, action) => {
            state.isLogin = action.payload
            localStorage.isLogin = action.payload
        },
        userData: (state, action) => {
            state.userData = action.payload
            localStorage.userData = JSON.stringify(action.payload)
        },
        isLogout: (state, action) => {
            state.isLogin = action.payload
            state.userData = null
            localStorage.removeItem('isLogin');
            localStorage.removeItem('userData');
        },
    }
})

export const { isLogin, userData, isLogout } = loginSlice.actions;
export default loginSlice.reducer;