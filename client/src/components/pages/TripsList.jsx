import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTripsPreview } from '../../features/trip/tripThunks';
import { timeAgo } from '../../utils/date.js';
import TripPreview from '../features/TripPreview';

function TripsList() {
  const dispatch = useDispatch();
  const {trips, loading, hasMore} = useSelector(store => store.trip);

  const [offset, setOffset] = useState(0);
  const limit = 5;
  console.log({offset, limit});

  useEffect(() => {
    dispatch(getAllTripsPreview({limit, offset}));
  }, [dispatch, limit, offset, hasMore]);

const handleScroll = () => {
    if (loading === 'pending' || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      {trips.map((trip) => (
        <TripPreview
          key={trip.id}
          userId={trip.userId}
          username={trip.username}
          avatar={trip.avatar}
          createdAt={timeAgo(trip.createdAt)}
          title={trip.title}
          description={trip.description}
          url={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${trip.url}`}
          link={`/full-trip/${trip.userId}/${trip.id}`}
        />
      ))}
      {loading === 'pending' && <p>Loading more trips...</p>}
      {!hasMore && <p>No more trips to load.</p>}
    </>
  );
}

export default TripsList;

