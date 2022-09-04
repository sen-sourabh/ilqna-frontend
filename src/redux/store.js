import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux/login-slice";

const store = configureStore({
    reducer: {
        login: loginReducer
    }
})

export default store;