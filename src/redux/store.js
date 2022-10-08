import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux/login-slice";
import { loginApi } from "./loginRedux/login-api-slice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        [loginApi.reducerPath]: loginApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(loginApi.middleware)
    },
})

export default store;