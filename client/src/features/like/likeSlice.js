
import { createSlice } from '@reduxjs/toolkit';
import { getItemLikesCountListByType } from './likeThunks';

const initialState = {
  recordLikesCountList: [],
  commentLikesCountList: [],
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
        if (action.payload.type === 'record') {
          state.recordLikesCountList = action.payload.data;
        } else {
          state.commentLikesCountList = action.payload.data;
        }
        state.loading = 'idle';
      })
      .addCase(getItemLikesCountListByType.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })

  }
});

export default likeSlice.reducer;
