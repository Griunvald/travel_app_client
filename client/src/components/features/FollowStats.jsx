import { useFollow } from '../../contexts/FollowContext';
import { useState, useEffect } from 'react';

function FollowStats() {
  const { followStats } = useFollow();
  const { followingCount, followersCount} = followStats;
  const [tripsCount, setTripsCount] = useState();

  useEffect(() => {

  const getTripsCount = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trip/get-trips-count', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json();
        setTripsCount(data);
      }

    } catch (err) {
      console.log(err);
    }
  }
    getTripsCount();
  }, []);

  return (
    <>
      <div className="flex gap-4 w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
        <div>Followers: {followersCount}</div>
        <div>Following: {followingCount}</div>
        <div>Trips: {tripsCount}</div>
      </div>
    </>
  );
}

export default FollowStats;
