import { createSlice } from '@reduxjs/toolkit';
import { getAllTripsPreview, getTripsCount, getFullTrip, getCurrentTripId, getCurrentTrip, getTripsList, closeTrip } from './tripThunks';

const initialState = {
  trip: null,
  trips: [],
  tripsList: [],
  currentTripId: null,
  tripDetails: {},
  entryList: [],
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
    },
    setCurrentTripId: (state, action) => {
      state.currentTripId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllTripsPreview
      .addCase(getAllTripsPreview.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getAllTripsPreview.fulfilled, (state, action) => {
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
      // GetFullTrip
      .addCase(getFullTrip.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getFullTrip.fulfilled, (state, action) => {
        state.tripDetails = action.payload.tripDetails;
        state.entryList = action.payload.records.rows;
        state.loading = 'idle'
      })
      .addCase(getFullTrip.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })

      // Get Current Trip Id
      .addCase(getCurrentTripId.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getCurrentTripId.fulfilled, (state, action) => {
        state.currentTripId = action.payload ?? null;
        state.loading = 'idle';
      })
      .addCase(getCurrentTripId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })

      // Get Current Trip
      .addCase(getCurrentTrip.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getCurrentTrip.fulfilled, (state, action) => {
        state.trip = action.payload ?? null;
        state.loading = 'idle';
      })
      .addCase(getCurrentTrip.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })

      // Get Trips List
      .addCase(getTripsList.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getTripsList.fulfilled, (state, action) => {
        state.tripsList = action.payload ?? null;
        state.loading = 'idle';
      })
      .addCase(getTripsList.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })

      // Close trip 
      .addCase(closeTrip.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(closeTrip.fulfilled, (state, action) => {
        state.currentTripId = null;
        state.loading = 'idle';
      })
      .addCase(closeTrip.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'idle';
      })
  }
});

export const { setTripsCount, setTripDetails, setEntryList, setCurrentTripId } = tripSlice.actions;
export default tripSlice.reducer;
