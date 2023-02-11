import { createSlice } from "@reduxjs/toolkit";

const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        answerData: []
    },
    reducers: {
        setAnswerData: (state, action) => {
            state.answerData = action.payload
        }
    }
})

export const { setAnswerData } = answerSlice.actions;
export default answerSlice.reducer;