import { createSlice } from '@reduxjs/toolkit';

const composeMessageSlice = createSlice({
  name: 'compose_message',
  initialState: {
    isOpen: false,
    discardLoading: false,
    draftLoading: false,
    sendLoading: false,
  },
  reducers: {
    openComposeMessage: (state, action) => {
      state.isOpen = action.payload;
    },
    setDiscardLoading: (state, action) => {
      state.discardLoading = action.payload;
    },
    setDraftLoading: (state, action) => {
      state.draftLoading = action.payload;
    },
    setSendLoading: (state, action) => {
      state.sendLoading = action.payload;
    },
  },
});

export const { openComposeMessage, setDiscardLoading, setDraftLoading, setSendLoading } =
  composeMessageSlice.actions;
export default composeMessageSlice.reducer;
