import { createSlice } from '@reduxjs/toolkit';
import { getFollowingUsers, followUser, unfollowUser, getFollowStats } from './followThunks';

const initialState = {
  followingUsersIds: [],
  follower: null,
  leaderId: null,
  followStats: {},
  loading: 'idle',
  error: null
}

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    setFollowingUsers: (state, action) => {
      state.followingUsersIds = action.payload;
    },
    setFollower: (state, action) => {
      state.follower = action.payload;
    },
    setLeaderId: (state, action) => {
      state.leaderId = action.payload;
    },
    setFollowStats: (state, action) => {
      state.followStats = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder

      // getFollowingUsers
      .addCase(getFollowingUsers.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getFollowingUsers.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.followingUsersIds = action.payload.followingUsersIds;
        state.follower = action.payload.userId;
      })
      .addCase(getFollowingUsers.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })

      // followUser
      .addCase(followUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.follower = action.payload;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })

      // unfollowUser
      .addCase(unfollowUser.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.followingUsersIds = state.followingUsersIds.filter(id => id !== action.payload);
        //state.followingUsersIds = action.payload;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })

      // getFollowStats
      .addCase(getFollowStats.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(getFollowStats.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.followStats = action.payload;
      })
      .addCase(getFollowStats.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
  }
});

export const { setFollowingUsers, setFollower, setLeaderId, setFollowStats } = followSlice.actions;
export default followSlice.reducer;
