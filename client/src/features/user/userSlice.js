import { createSlice } from '@reduxjs/toolkit';
import { initializeUser } from './userThunks';

const initialState = {
  userId: null,
  username: '',
  currentTripId: null,
  loading: 'idle',
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action){
      state.userId = action.payload;
    },
    setUsername(state, action){
      state.username = action.payload;
    },
    setCurrentTripId(state, action){
      state.currentTripId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.userId = action.payload.userId;
        state.loading = 'idle';
      })
      .addCase(initializeUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      });
  },
});

export const { setUserId, setUsername, setCurrentTripId } = userSlice.actions;
export default userSlice.reducer;
