import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    questionData: [],
  },
  reducers: {
    setQuestionData: (state, action) => {
      state.questionData = action.payload;
    },
  },
});

export const { setQuestionData } = questionSlice.actions;
export default questionSlice.reducer;
