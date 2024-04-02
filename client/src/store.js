import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import tripReducer from './features/trip/tripSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trip: tripReducer
  },
  devTools: process.env.NODE_ENV !== 'production', 
});


