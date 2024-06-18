import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAllTripsPreview } from '../../features/trip/tripThunks';
import { timeAgo } from '../../utils/date.js';
import TripPreview from '../features/TripPreview';

function TripsList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {trips, loading, hasMore} = useSelector(store => store.trip);

  const [offset, setOffset] = useState(0);
  const limit = 5;

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

    useEffect(() => {
    if (location.state && location.state.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location]);

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
          about={trip.about}
          createdAt={timeAgo(trip.createdAt)}
          title={trip.title}
          description={trip.description}
          url={`${import.meta.env.VITE_AWS_S3_URL}/${trip.url}`}
          link={`/full-trip/${trip.userId}/${trip.id}`}
        />
      ))}
    <div className="w-full text-center mt-20">
      {loading === 'pending' && <p>Loading more trips...</p>}
      {!hasMore && <p>No more trips in this list... maybe check your suitcase for a hidden one?</p>}
      </div>
    </>
  );
}

export default TripsList;

