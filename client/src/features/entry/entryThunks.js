import { createAsyncThunk } from '@reduxjs/toolkit';

export const getEntryList = createAsyncThunk(
  'entry/setEntryList',
  async (userId, thunkApi) => {
    const url = `${import.meta.env.VITE_API_URL}/trips/current/records/tags?userId=${userId}`
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
    const url = `${import.meta.env.VITE_API_URL}/records/text/${entryId}`
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


export const editEntry = createAsyncThunk(
  'entry/editEntry',
  async ({ entryId, textValue }, thunkApi) => {
    const url = `${import.meta.env.VITE_API_URL}/records/text/${entryId}`
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ textValue })
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
