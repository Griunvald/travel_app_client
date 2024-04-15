import { createSlice } from '@reduxjs/toolkit';
import { getAllTripsPreview, getTripsCount } from './tripThunks';

const initialState = {
  trips: [],
  tripsCount: 0,
  loading: 'idle',
  error: null
}

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setTripsCount: (state, action) => {
      state.tripsCount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // getAllTripsPreview
      .addCase(getAllTripsPreview.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getAllTripsPreview.fulfilled, (state, action) => {
        console.log(action);
        state.loading = 'idle';
        state.trips = action.payload;
      })
      .addCase(getAllTripsPreview.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      // getTripsCounts
      .addCase(getTripsCount.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getTripsCount.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.tripsCount = action.payload;
      })
      .addCase(getTripsCount.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
  }
});

export const { setTripsCount } = tripSlice.actions;
export default tripSlice.reducer;
