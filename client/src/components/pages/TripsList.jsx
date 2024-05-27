import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTripsPreview } from '../../features/trip/tripThunks';
import { timeAgo } from '../../utils/date.js';
import TripPreview from '../features/TripPreview';

function TripsList() {
  const dispatch = useDispatch();
  const trips = useSelector(store => store.trip.trips);
  //TODO: add loader and error message
  //if (isLoading) return <p>Loading...</p>;
  //if (error) return <p>Error loading trips!</p>;
  useEffect(() => {
    dispatch(getAllTripsPreview({limit: 3, offset: 0}));
  }, []);

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
    </>
  );
}

export default TripsList;

