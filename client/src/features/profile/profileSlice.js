import { createSlice } from '@reduxjs/toolkit';
import { updateProfile, getProfileFromLocalStorage } from './profileThunks';

const initialState = {
  about: '',
  avatar: '',
  loading: 'idle',
  error: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAbout: (state, action) => {
      state.about = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //TODO: get data from localStorage
      // getProfile
      .addCase(getProfileFromLocalStorage.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getProfileFromLocalStorage.fulfilled, (state, action) => {
        const { about, avatar } = action.payload || {};
        state.about = about || '';
        state.avatar = avatar || '';
        state.loading = 'idle';
      })
      .addCase(getProfileFromLocalStorage.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })


      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.about = action.payload.about;
        state.avatar = action.payload.avatar;
        state.loading = 'idle';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
  }
});

export const { setAbout } = profileSlice.actions;
export default profileSlice.reducer;
