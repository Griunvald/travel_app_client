import { createSlice } from '@reduxjs/toolkit';
import { getComments } from './commentThunks'

const initialState = {
  commentsList: [],
  loading: 'idle',
  error: null,
}

const commentSlice = createSlice({
  name: 'entry',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.commentsList = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload;
      })
  }
});

export default commentSlice.reducer;
