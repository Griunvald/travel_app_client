import { createAsyncThunk } from '@reduxjs/toolkit';

export const getComments = createAsyncThunk(
  'comment/getComments',
  async (tripId, thunkApi) => {
    const url = `http://localhost:3003/api/v1/comments/${tripId}`
    try {
      const response = await fetch(url);
      if (response.ok) {
        const comments = await response.json()
        return comments;
      } else {
        console.error('Failed to get comments');
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
