import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentTrip } from './userThunks.js';

const initialState = {
  username: '',
  userId: null,
  currentTripId: null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { username, userId } = action.payload;
      state.username = username;
      state.userId = userId;
    },
    clearUserInfo: (state) => {
      state.username = '';
      state.userId = null;
      state.currentTripId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentTrip.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentTrip.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentTripId = action.payload.id;
      })
      .addCase(fetchCurrentTrip.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;

