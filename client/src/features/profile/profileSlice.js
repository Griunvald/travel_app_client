import { createSlice } from '@reduxjs/toolkit';
import { getProfile, updateProfile } from './profileThunks';

const initialState = {
  about: '',
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
    // getProfile
    .addCase(getProfile.pending, (state)=> {
       state.loading = 'pending';
    })
    .addCase(getProfile.fulfilled, (state, action)=> {
       state.about = action.payload // 
       //state.about = action.payload.about; // about: ""
       state.loading = 'idle';
    })
    .addCase(getProfile.rejected, (state, action)=> {
       state.loading = 'idle';
       state.error = action.payload;
    })


     // updateProfile
    .addCase(updateProfile.pending, (state)=> {
       state.loading = 'pending';
    })
    .addCase(updateProfile.fulfilled, (state, action)=> {
       state.about = action.payload;
       state.loading = 'idle';
    })
    .addCase(updateProfile.rejected, (state, action)=> {
       state.loading = 'idle';
       state.error = action.payload;
    })
  }
});

export const { setAbout } = profileSlice.actions;
export default profileSlice.reducer;
