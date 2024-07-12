import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTripsPreview = createAsyncThunk(
  'trip/getAllTripsPreview',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trips/preview/${limit}/${offset}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch trips preview');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTripsCount = createAsyncThunk(
  'trip/getTripsCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trips/count`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch trips count');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFullTrip = createAsyncThunk(
  'trip/getFullTrip',
  async ({ userId, tripId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trips/full/${userId}/${tripId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched full trip data:', data); // Add a log to verify data
        return data;
      } else {
        return rejectWithValue('Failed to fetch trip details');
      }
    } catch (err) {
      console.error('Failed to fetch trip details:', err);
      return rejectWithValue(err.message);
    }
  }
);

export const getCurrentTripId = createAsyncThunk(
  'trip/getCurrentTripId',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trips/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      if (!text) {
        return null;
      }
      const data = JSON.parse(text);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch current trip id');
    }
  }
);

export const getCurrentTrip = createAsyncThunk(
  'trip/getCurrentTrip',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trips/current`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch current trip');
    }
  }
);

export const getTripsList = createAsyncThunk(
  'trip/getTripsList',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trips/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      if (!text) {
        return null;
      }
      const data = JSON.parse(text);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch trips list');
    }
  }
);

export const closeTrip = createAsyncThunk(
  'trip/closeTrip',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trips/close`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to close trip');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

