import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCurrentTrip = createAsyncThunk(
  'user/fetchCurrentTrip',
  async (userId, thunkAPI) => {
    const response = await fetch(`http://localhost:3003/api/v1/trip/get-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    return data;
  }
);

