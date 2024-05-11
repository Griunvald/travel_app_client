import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import tripReducer from './features/trip/tripSlice.js';
import toastReducer from './features/toast/toastSlice.js';
import tagsReducer from './features/tag/tagsSlice.js';
import profileReducer from './features/profile/profileSlice.js';
import menuReducer from './features/menu/menuSlice.js';
import followReducer from './features/follow/followSlice.js';
import entryReducer from './features/entry/entrySlice.js';
import commentReducer from './features/comment/commentSlice.js';
import likeReducer from './features/like/likeSlice.js';


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
    comment: commentReducer,
    like: likeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


