import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  duration: 3000
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.duration = action.payload.duration || 3000;
    },
    hideToast: (state) => {
      state.message = null;
      state.duration = 0;
    }
  }
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
