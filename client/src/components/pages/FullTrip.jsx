import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import TripPreview from '../features/TripPreview';
import Entry from '../features/Entry';
import CommentsContainer from '../features/comments/CommentsContainer';
import { getFollowingUsers } from '../../features/follow/followThunks';
import { getFullTrip } from '../../features/trip/tripThunks';
import BackButton from '../common/BackButton'

function FullTrip() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const leaderId = useSelector(store => store.follow.leaderId);
  const username = useSelector(store => store.user.username);
  const ID = Number(userId);

  const { tripDetails, entryList } = useSelector((state) => state.trip);
  const [buttonBottom, setButtonBottom] = useState(0);
  
  const Open = () => (<p className="text-center font-bold mt-6">To be continued...</p>);
  const Closed = () => (<p className="text-center font-bold mt-6">The end</p>);

  const formattedDate = tripDetails.createdAt ? format(new Date(tripDetails.createdAt), "MMMM do, yyyy, hh:mm a") : null;

  useEffect(() => {
    if (username) {
      dispatch(getFollowingUsers());
    }
  }, [leaderId]);

  useEffect(() => {
    dispatch(getFullTrip(userId));
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    const handleScroll = () => {
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const buttonHeight = 25;

        if (footerRect.top < window.innerHeight) {
          setButtonBottom(window.innerHeight - footerRect.top + buttonHeight);
        } else {
          setButtonBottom(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  return (
    <div className="relative pb-20"> {/* Add padding to the bottom to prevent content from being hidden behind the button */}
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
      {
       tripDetails.status === "open" ? <Open /> : <Closed />
      }
      <CommentsContainer />
      <div style={{ bottom: `${buttonBottom}px` }} className="fixed left-0 w-full flex justify-center py-4">
        <BackButton name="Back to Trips List"  onClick={() => navigate(-1)}/>
        </div>
    </div>
  );
};

export default FullTrip;

