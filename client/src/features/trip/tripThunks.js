import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTripsPreview = createAsyncThunk(
  'trip/getAllTripsPreview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trip/get-all-trips-preview');
      const data = await response.json();
      console.log("Data: ", data);
      console.log("Data type: ", Array.isArray(data)); //true
      return data;
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      return rejectWithValue(error.message);
    }
  }
);


export const getTripsCount = createAsyncThunk(
  'trip/getTripsCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trip/get-trips-count', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error('Failed to get trips count: ', err);
      return rejectWithValue(err.message);
    }
  }
);

export const getFullTrip = createAsyncThunk(
  'trip/getFullTrip',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3003/api/v1/trip/get-full-trip?userId=${userId}`);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch trips:', err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCurrentTrip = createAsyncThunk(
  'user/fetchCurrentTrip',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trip/get-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      console.log(text);
      if (!text) {
        return null;
      }

      const data = JSON.parse(text);
      console.log(data);
      console.log(data.id);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch current trip');
    }
  }
);
