import { createAsyncThunk } from '@reduxjs/toolkit';
export const getFollowingUsers = createAsyncThunk(
  'follow/getFollowingUsers',
  async (_, thunkApi) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/follow/get-following', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const { userId, followingUsersIds } = data.following;
        console.log(userId, followingUsersIds);
        return { userId: data.following.userId, followingUsersIds: data.following.followingUsersIds}
        //setFollowingUsers(followingUsersIds);
        //setFollower(userId);
      } else {
        console.error('Failed to fetch followed users with response status: ', response.status);
      }
    } catch (err) {
      console.error('Error fetching followed users:', err);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


// include in a file:

//useEffect(() => {
//  if (!follower) return;
//  fetchFollowingUsers();
//}, []);


export const followUser = createAsyncThunk(
  'follow/followUser',
  async (leaderId, thunkApi) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/follow/follow-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ leaderId })
      })
      if (response.ok) {
        // await fetchFollowingUsers();
        await thunkApi.dispatch(getFollowingUsers());
        console.log("Start following user with id: ", leaderId);
        return leaderId;
      }
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);


export const unfollowUser = createAsyncThunk(
  'follow/unfollowUser',
  async (leaderId, thunkApi) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/follow/unfollow-user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ leaderId })
      })
      if (response.ok) {
        //  await fetchFollowingUsers();
        await thunkApi.dispatch(getFollowingUsers());
        console.log("Stopped to unfollow user with id: ", leaderId);
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
      const response = await fetch('http://localhost:3003/api/v1/follow/get-follow-stats', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json();
        return data;
        //  setFollowStats(data);
      }
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err.message);
    }
  }

);

