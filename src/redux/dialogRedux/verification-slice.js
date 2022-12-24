import { createSlice } from "@reduxjs/toolkit";

const verificationSlice = createSlice({
    name: 'verification',
    initialState: {
        isVerifyOpen: false,
        verifyTimer: 60,
        OTP: ''
    },
    reducers: {
        isVerifyOpen: (state, action) => {
            state.isVerifyOpen = action.payload
        },
        verifyTimer: (state) => {
            state.verifyTimer -= 1
        },
        resetVerifyTimer: (state) => {
            state.verifyTimer = 60
        },
        setOTP: (state, action) => {
            state.OTP = action.payload;
        },
    }
})

export const { isVerifyOpen, verifyTimer, resetVerifyTimer, setOTP } = verificationSlice.actions;
export default verificationSlice.reducer;