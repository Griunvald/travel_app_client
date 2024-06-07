import { createAsyncThunk } from '@reduxjs/toolkit';

export const addLike = createAsyncThunk(
  'like/addLike',
  async ({ type, itemId }, thunkApi) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/likes/${type}/${itemId}`, {
        method: 'POST',
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


export const removeLike = createAsyncThunk(
  'like/removeLike',
  async ({ type, itemId }, thunkApi) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/likes/${type}/${itemId}`, {
        method: 'DELETE',
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


export const getItemLikesCountListByType = createAsyncThunk(
  'like/getItemLikesCountListByType',
  async ({ type, itemId }, thunkApi) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/likes/item/${type}`, {
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
      return { data, type };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
