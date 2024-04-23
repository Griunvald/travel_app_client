import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEntryList = createAsyncThunk(
  'entry/setEntryList',
  async (userId, thunkApi) => {
    const url = `http://localhost:3003/api/v1/trips/current/records/tags?userId=${userId}`
    try {
      const response = await fetch(url);
      if (response.ok) {
        const list = await response.json()
        return list;
      } else {
        console.error('Failed to get EntryList');
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

