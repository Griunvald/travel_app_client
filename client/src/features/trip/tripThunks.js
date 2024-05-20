import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTripsPreview = createAsyncThunk(
  'trip/getAllTripsPreview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trips/preview');
      const data = await response.json();
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
      const response = await fetch('http://localhost:3003/api/v1/trips/count', {
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
      const response = await fetch(`http://localhost:3003/api/v1/trips/full/${userId}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Failed to fetch trips:', err);
      return rejectWithValue(err.message);
    }
  }
);

export const getCurrentTripId = createAsyncThunk(
  'trip/getCurrentTripId',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trips/current', {
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
      const response = await fetch('http://localhost:3003/api/v1/trips/current', {
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
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch current trip');
    }
  }
);


export const getTripsList = createAsyncThunk(
  'trip/getTripList',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trips/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const text = await response.text();
      if (!text) {
        return null;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = JSON.parse(text);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch trips list');
    }
  }
);

