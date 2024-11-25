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


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData, thunkAPI) => {
    const url = `${import.meta.env.VITE_API_URL}/auth/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to login');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to login', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to login');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      return thunkAPI.rejectWithValue(error.message || 'Unable to log out');
    }
  }
);

export const joinUser = createAsyncThunk(
  'user/joinUser',
  async (data, thunkAPI) => {
    const url = `${import.meta.env.VITE_API_URL}/auth/register`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(responseData.error);
      }

      return responseData;
    } catch (error) {
      console.error('There was a problem with the join operation:', error);
      return thunkAPI.rejectWithValue(error.message || 'Unable to join');
    }
  }
);

