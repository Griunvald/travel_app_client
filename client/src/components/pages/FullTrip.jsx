import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const leaderId = useSelector(store => store.follow.leaderId);
  const username = useSelector(store => store.user.username);
  const ID = Number(userId);

  const { tripDetails, entryList } = useSelector((state) => state.trip);
  const [buttonBottom, setButtonBottom] = useState(0);

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
      <CommentsContainer />
      <div style={{ bottom: `${buttonBottom}px` }} className="fixed left-0 w-full flex justify-center py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-white text-black border border-primary rounded"
        >
          Back to Trips List
        </button>
      </div>
    </div>
  );
};

export default FullTrip;

