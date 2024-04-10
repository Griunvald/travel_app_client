import { createSlice } from '@reactjs/toolkit';
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
      state.followingUsers = action.payload;
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
        const { followingUsersIds, userId } = action.payload;
        state.followingUsers = followingUsersIds;
        state.follower = userId;
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
        const { followingUsersIds, userId } = action.payload;
        state.followingUsers = followingUsersIds;
        state.follower = userId;
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
        const { followingUsersIds, userId } = action.payload;
        state.followingUsers = followingUsersIds;
        state.follower = userId;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
  }
});

export const { setFollowingUsers, setFollower, setLeaderId, setFollowStats } = followSlice.actions;
export default followSlice.reducer;
