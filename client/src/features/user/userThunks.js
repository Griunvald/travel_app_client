import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUsername, setUserId } from './userSlice';
import getCookie from '../../utils/cookieUtils';

export const initializeUser = createAsyncThunk(
  'user/initializeUser',
  async (_, thunkAPI) => {
    try {
      const userInfo = getCookie('user_info');
      if (userInfo) {
        const parsedInfo = JSON.parse(userInfo);
        thunkAPI.dispatch(setUsername(parsedInfo.username));
        thunkAPI.dispatch(setUserId(parsedInfo.userId));
        return parsedInfo;
      }
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to initialize user');
    }
  }
);

export const fetchCurrentTrip = createAsyncThunk(
  'user/fetchCurrentTrip',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trip/get-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const text = await response.text();
      if (!text) {
        return null;
      }

      const data = JSON.parse(text);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch current trip');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ( formData, thunkAPI) => {
   const url =  'http://localhost:3003/api/v1/auth/login';
    try {
      const response = await fetch(url,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to login', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to login');
    }
  }
);

