import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux/login-slice";
import verificationReducer from "./dialogRedux/verification-slice";
import forgotPasswordReducer from "./loginRedux/forgotPassword-slice";
import snackbarReducer from "./snackbarRedux/snackbar-slice";
import updateUsernameReducer from "./dialogRedux/update-username-slice";
import changePasswordReducer from "./dialogRedux/change-password";
import filterReducer from "./dialogRedux/filter-slice";
import aboutReducer from "./dialogRedux/about-slice";
import showMessageReducer from "./dialogRedux/show-message-slice";
import composeMessageReducer from "./dialogRedux/compose-message-slice";
import { questionApiSlice } from "./api-saga/questions-api";
import questionReducer from "./questionRedux/question-slice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        verification: verificationReducer,
        forgotPassword: forgotPasswordReducer,
        snackbar: snackbarReducer,
        update_username: updateUsernameReducer,
        change_password: changePasswordReducer,
        filter: filterReducer,
        about: aboutReducer,
        show_message: showMessageReducer,
        compose_message: composeMessageReducer,
        question: questionReducer,
        [questionApiSlice.reducerPath]: questionApiSlice.reducer
    },
    middleware: (curryGetDefaultMiddleware) => {
        return curryGetDefaultMiddleware().concat(
            questionApiSlice.middleware
        )
    }
})

export default store;