// Add two functions: getProfile and updateProfile
// Use getProfile in Profile component
// Use updatePfofile in About component

import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (userId, thunkApi) => {
      try {
        const response = await fetch(`http://localhost:3003/api/v1/user/profile/get-profile?userId=${userId}`);
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
  async ({userId, data}, thunkApi) => {
    const url = `http://localhost:3003/api/v1/user/profile/update-profile?userId=${userId}`; 
      try {
        const response = await fetch(url, {
          method: 'PUT',
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



