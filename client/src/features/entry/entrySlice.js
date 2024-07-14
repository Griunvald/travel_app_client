import { createSlice } from '@reduxjs/toolkit';
import { getEntryList, addEntry } from './entryThunks';

const initialState = {
  entryList: [],
  loading: 'idle',
  error: null,
};

const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEntryList.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getEntryList.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entryList = action.payload;
      })
      .addCase(getEntryList.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(addEntry.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entryList.unshift(action.payload); // Add the new entry to the beginning of the list
      })
      .addCase(addEntry.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      });
  },
});

export default entrySlice.reducer;

