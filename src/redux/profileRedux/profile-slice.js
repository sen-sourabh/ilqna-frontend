import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: null,
  },
  reducers: {
    setProfileData: (state, actions) => {
      state.profileData = actions.payload;
    },
  },
});

export const { setProfileData } = profileSlice.actions;
export default profileSlice.reducer;
