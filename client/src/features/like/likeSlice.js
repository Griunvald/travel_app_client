
import { createSlice } from '@reduxjs/toolkit';
import { getItemLikesCountListByType } from './likeThunks';

const initialState = {
  likesCountList: [],
  loading: 'idle',
  error: null
}

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  extraReducers: (builder) => {
    builder
      // getItemLikesCountListByType
      .addCase(getItemLikesCountListByType.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getItemLikesCountListByType.fulfilled, (state, action) => {
        state.likesCountList = action.payload;
        state.loading = 'idle';
      })
      .addCase(getItemLikesCountListByType.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })

  }
});

export default likeSlice.reducer;
