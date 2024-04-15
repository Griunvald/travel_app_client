import { useFollow } from '../../contexts/FollowContext';
import { getFollowStats } from '../../features/follow/followThunks';
import { useState, useEffect } from 'react';
import { getTripsCount } from '../../features/trip/tripThunks';
import { setTripsCount } from '../../features/trip/tripSlice';
import { useSelector, useDispatch } from 'react-redux';

function FollowStats() {
  //const { followStats } = useFollow();
  //const { followingCount, followersCount} = followStats;
  //const [tripsCount, setTripsCount] = useState();
  const dispatch = useDispatch();
  const { tripsCount } = useSelector(store => store.trip);
  const { followingCount, followersCount } = useSelector(store => store.follow.followStats);

  useEffect(() => {
    dispatch(getTripsCount());
    dispatch(setTripsCount());
    dispatch(getFollowStats());
  }, [dispatch]);

  return (
    <>
      <div className="flex gap-4 w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
        <div>Trips: {tripsCount}</div>
        <div>Followers: {followersCount}</div>
        <div>Following: {followingCount}</div>
      </div>
    </>
  );
}

export default FollowStats;


// TODO: Replace follow context with Slice
        //<div>Followers: {followersCount}</div>
        //<div>Following: {followingCount}</div>
