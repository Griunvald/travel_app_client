import { createSlice } from '@reduxjs/toolkit';
import { getEntryList } from './entryThunks';

const initialState = {
  entryList: [],
  loading: 'idle',
  error: null,
}

const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    setEntryList: (state, action) => {
     state.entryList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEntryList.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getEntryList.fulfilled, (state, action) => {
        state.loading = 'idle'
        state.entryList = action.payload;
      })
      .addCase(getEntryList.rejected, (state, action) => {
        state.loading = 'idle'
        state.error = action.payload;
      })
  }
});

export const { setEntryList } = entrySlice.actions;
export default entrySlice.reducer;
