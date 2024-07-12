import { useEffect } from 'react';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import TripPreview from '../features/TripPreview';
import AddEntry from '../features/AddEntry';
import EntryList from '../features/EntryList';
import { getFullCurrentTrip } from '../../features/trip/tripThunks';

function CurrentTrip() {
  const { username, userId } = useSelector(store => store.user);
  const { avatar } = useSelector(store => store.profile);
  const { tripDetails } = useSelector(store => store.trip);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getFullCurrentTrip(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
      {tripDetails && (
        <TripPreview
          key={tripDetails.id}
          username={username}
          avatar={avatar}
          createdAt={tripDetails.createdAt ? format(new Date(tripDetails.createdAt), "MMMM do, yyyy, hh:mm a") : ''}
          title={tripDetails.title}
          description={tripDetails.description}
          url={`${import.meta.env.VITE_AWS_S3_URL}/${tripDetails.url}`}
        />
      )}
      <EntryList />
      <AddEntry />
    </>
  );
}

export default CurrentTrip;

