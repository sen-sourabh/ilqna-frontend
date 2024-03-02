import { createSlice } from '@reduxjs/toolkit';

let userDataSample = {
  username: '',
  email: '',
  phone: 1245467890,
  password: '',
  image: '',
  userType: '',
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
  deleted: false,
  active: true,
  isLogin: false,
  lastLogin: '',
  ipAddress: '',
  location: '',
  company: '',
  designation: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: localStorage.isLogin ? true : false,
    userData: localStorage.userData ? JSON.parse(localStorage.userData) : userDataSample,
  },
  reducers: {
    isLogin: (state, action) => {
      state.isLogin = action.payload;
      localStorage.isLogin = action.payload;
    },
    userData: (state, action) => {
      state.userData = action.payload;
      localStorage.userData = JSON.stringify(action.payload);
    },
    isLogout: (state, action) => {
      state.isLogin = action.payload;
      state.userData = null;
      localStorage.clear();
    },
  },
});

export const { isLogin, userData, isLogout } = loginSlice.actions;
export default loginSlice.reducer;
