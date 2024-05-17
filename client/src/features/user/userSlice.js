import { createSlice } from '@reduxjs/toolkit';
import { initializeUser, joinUser, loginUser, logoutUser } from './userThunks';

const initialState = {
  userId: null,
  username: '',
  avatar: '',
  loading: 'idle',
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
    setCurrentTripId(state, action) {
      state.currentTripId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initialize User
      .addCase(initializeUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.username = action.payload?.username ?? '';
        state.userId = action.payload?.userId ?? null;
        state.avatar = action.payload?.avatar ?? '';
        state.loading = 'idle';
      })
      .addCase(initializeUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.username = action.payload?.userInfo.username ?? '';
        state.userId = action.payload?.userInfo.userId ?? null;
        state.loading = 'idle';
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.username = '';
        state.userId = null;
        state.currentTripId = null,
          state.avatar = null,
          state.loading = 'idle';
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })

      // Join User
      .addCase(joinUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(joinUser.fulfilled, (state, action) => {
        const payload = JSON.parse(action.payload);
        state.username = payload?.username ?? '';
        state.userId = payload?.userId ?? null;
        state.loading = 'idle';
      })

      .addCase(joinUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })
  },
});

export const { setUserId, setUsername, setAvatar, setCurrentTripId } = userSlice.actions;
export default userSlice.reducer;
