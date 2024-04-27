import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import tripReducer from './features/trip/tripSlice.js';
import toastReducer from './features/toast/toastSlice.js';
import tagsReducer from './features/tag/tagsSlice.js';
import profileReducer from './features/profile/profileSlice.js';
import menuReducer from './features/menu/menuSlice.js';
import followReducer from './features/follow/followSlice.js';
import entryReducer from './features/entry/entrySlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    trip: tripReducer,
    toast: toastReducer,
    tag: tagsReducer,
    profile: profileReducer,
    menu: menuReducer,
    follow: followReducer,
    entry: entryReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export function makeTestStore(initialState) {
  return configureStore({
    reducer: {
      user: userReducer,
      trip: tripReducer,
      toast: toastReducer,
      tag: tagsReducer,
      profile: profileReducer,
      menu: menuReducer,
      follow: followReducer,
      entry: entryReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
  });
}
