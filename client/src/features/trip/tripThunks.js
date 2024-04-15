import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllTripsPreview = createAsyncThunk(
  'trip/getAllTripsPreview',
  async(_, { rejectWithValue }) => {
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
  async(_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trip/get-trips-count', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json();
        return data;
        //setTripsCount(data); - add this function to the trip's slice reducer
      } 
    } catch (err) {
        console.error('Failed to get trips count: ', err);
        return rejectWithValue(err.message);
    }
  }
);


