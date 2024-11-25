import { createAsyncThunk } from '@reduxjs/toolkit';
export const getFollowingUsers = createAsyncThunk(
  'follow/getFollowingUsers',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/follows/following`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        return { userId: data.following.userId, followingUsersIds: data.following.followingUsersIds }
      } else {
        console.error('Failed to fetch followed users with response status: ', response.status);
      }
    } catch (err) {
      console.error('Error fetching followed users:', err);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const followUser = createAsyncThunk(
  'follow/followUser',
  async (leaderId, thunkApi) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/follows/${leaderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ leaderId })
      })
      if (response.ok) {
        await thunkApi.dispatch(getFollowingUsers());
        return leaderId;
      }
    } catch (err) {
      console.error(err);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


export const unfollowUser = createAsyncThunk(
  'follow/unfollowUser',
  async (leaderId, thunkApi) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/follows/${leaderId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ leaderId })
      })
      if (response.ok) {
        await thunkApi.dispatch(getFollowingUsers());
        return leaderId;
      } else {
        console.error("Failed to unfollow user: ", err);
      }
    } catch (err) {
      console.error("Error unfollowing user: ", err);
      return thunkApi.rejectWithValue(err.message);
    }

  }
);

export const getFollowStats = createAsyncThunk(
  'follow/getFollowStats',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/follows/stats`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error(err);
      return thunkApi.rejectWithValue(err.message);
    }
  }

);

