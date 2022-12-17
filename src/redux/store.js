import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux/login-slice";
import verificationReducer from "./dialogRedux/verification-slice";
import forgotPasswordReducer from "./loginRedux/forgotPassword-slice";
import snackbarReducer from "./snackbarRedux/snackbar-slice";
import updateUsernameReducer from "./dialogRedux/update-username-slice";
import changePasswordReducer from "./dialogRedux/change-password";
import filterReducer from "./dialogRedux/filter-slice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        verification: verificationReducer,
        forgotPassword: forgotPasswordReducer,
        snackbar: snackbarReducer,
        update_username: updateUsernameReducer,
        change_password: changePasswordReducer,
        filter: filterReducer
    }
})

export default store;