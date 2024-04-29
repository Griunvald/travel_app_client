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

export const deleteEntry = createAsyncThunk(
  'entry/deleteEntry',
  async ({ entryId, type }, thunkApi) => {
    const url = `http://localhost:3003/api/v1/records/text/${entryId}`
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ type })
      });
      if (response.ok) {
        return await response.json()
      } else {
        console.error("Can't delete entry");
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
)
