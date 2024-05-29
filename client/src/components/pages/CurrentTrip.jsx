import { useEffect } from 'react';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import TripPreview from '../features/TripPreview';
import AddEntry from '../features/AddEntry';
import EntryList from '../features/EntryList';
import { getCurrentTrip } from '../../features/trip/tripThunks';

function CurrentTrip() {
  const { username, userId } = useSelector(store => store.user);
  const { avatar} = useSelector(store => store.profile);
  const { trip } = useSelector(store => store.trip);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentTrip(userId))
  }, [userId]);

  return (
    <>
      {trip && (
        <TripPreview
          key={trip.id}
          username={username}
          avatar={avatar}
          createdAt={trip.createdAt ? format(new Date(trip.createdAt), "MMMM do, yyyy, hh:mm a") : ''}
          title={trip.title}
          description={trip.description}
          url={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${trip.url}`}
        />
      )}

      <EntryList />
      <AddEntry />
    </>
  );
}

export default CurrentTrip;
