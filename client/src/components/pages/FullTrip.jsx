import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import TripPreview from '../features/TripPreview';
import Entry from '../features/Entry';
import CommentsContainer from '../features/comments/CommentsContainer';
import { getFollowingUsers } from '../../features/follow/followThunks';
import { getFullTrip } from '../../features/trip/tripThunks';

function FullTrip() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const leaderId = useSelector(store => store.follow.leaderId);
  const username = useSelector(store => store.user.username);
  const ID = Number(userId);

  const { tripDetails, entryList } = useSelector((state) => state.trip);

  const formattedDate = tripDetails.createdAt ? format(new Date(tripDetails.createdAt), "MMMM do, yyyy, hh:mm a") : null;

  useEffect(() => {
    if(username){
      dispatch(getFollowingUsers());
    }
  }, [leaderId]);

  useEffect(() => {
    dispatch(getFullTrip(userId));
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {tripDetails &&
        <TripPreview
          avatar={tripDetails.avatar}
          about={tripDetails.about}
          username={tripDetails.username}
          createdAt={formattedDate}
          title={tripDetails.title}
          description={tripDetails.description}
          url={`${import.meta.env.VITE_AWS_S3_URL}/${tripDetails.url}`}
          userId={ID}
        />
      }
      {
        entryList && (
          Array.isArray(entryList) && entryList.map(entry => (
            <div key={entry.id}>
              <Entry
                entryId={entry.id}
                createdAt={entry.createdAt}
                textValue={entry.textValue}
                urlValue={entry.urlValue}
                recordTags={entry.recordTags}
              />
            </div>
          ))
        )
      }
      <CommentsContainer />
    </>
  );
};

export default FullTrip;
