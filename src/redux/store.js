import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux/login-slice";
import verificationReducer from "./dialogRedux/verification-slice";
import forgotPasswordReducer from "./loginRedux/forgotPassword-slice";
import snackbarReducer from "./snackbarRedux/snackbar-slice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        verification: verificationReducer,
        forgotPassword: forgotPasswordReducer,
        snackbar: snackbarReducer
    }
})

export default store;