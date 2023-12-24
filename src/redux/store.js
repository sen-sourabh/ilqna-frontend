import { configureStore } from '@reduxjs/toolkit';
import allUsersReducer from './allUsersRedux/allusers-slice';
import answerReducer from './answerRedux/answer-slice';
import { questionApiSlice } from './api-saga/questions-api';
import categoriesReducer from './categoriesRedux/categories-slice';
import aboutReducer from './dialogRedux/about-slice';
import changePasswordReducer from './dialogRedux/change-password';
import composeMessageReducer from './dialogRedux/compose-message-slice';
import filterReducer from './dialogRedux/filter-slice';
import showMessageReducer from './dialogRedux/show-message-slice';
import updateUsernameReducer from './dialogRedux/update-username-slice';
import verificationReducer from './dialogRedux/verification-slice';
import languagesReducer from './languagesRedux/languages-slice';
import forgotPasswordReducer from './loginRedux/forgotPassword-slice';
import loginReducer from './loginRedux/login-slice';
import profileReducer from './profileRedux/profile-slice';
import questionReducer from './questionRedux/question-slice';
import snackbarReducer from './snackbarRedux/snackbar-slice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    category: categoriesReducer,
    language: languagesReducer,
    all_users: allUsersReducer,
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
    answer: answerReducer,
    [questionApiSlice.reducerPath]: questionApiSlice.reducer,
  },
  middleware: (curryGetDefaultMiddleware) => {
    return curryGetDefaultMiddleware().concat(questionApiSlice.middleware);
  },
});

export default store;
