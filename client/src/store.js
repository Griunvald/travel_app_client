import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import tripReducer from './features/trip/tripSlice.js';
import toastReducer from './features/toast/toastSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trip: tripReducer, 
    toast: toastReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', 
});


