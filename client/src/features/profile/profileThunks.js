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
      localStorage.setItem('profile', JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const getProfileFromLocalStorage = createAsyncThunk(
  'profile/getProfileFromLocalStorage',
  async (_, thunkApi) => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      return profile;
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

