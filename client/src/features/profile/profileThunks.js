import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProfileAndSaveToLocalStorage = createAsyncThunk(
  'profile/getProfileAndSaveToLocalStorage',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched profile data:', data); // Log fetched data for debugging
      localStorage.setItem('profile', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error); // Log error for debugging
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getProfileFromLocalStorage = createAsyncThunk(
  'profile/getProfileFromLocalStorage',
  async (_, thunkApi) => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      console.log('Profile from local storage:', profile); // Log profile from local storage for debugging
      return profile;
    } catch (error) {
      console.error('Error getting profile from local storage:', error); // Log error for debugging
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const getProfileById = createAsyncThunk(
  'profile/getProfile',
  async (userId, thunkApi) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data, thunkApi) => {
    const url = `${import.meta.env.VITE_API_URL}/users/profile`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

