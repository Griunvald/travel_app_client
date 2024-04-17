import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import TripPreview from '../features/TripPreview';
import Entry from '../features/Entry';
import { getFollowingUsers } from '../../features/follow/followThunks';
//import { useFollow } from '../../contexts/FollowContext';

function FullTrip() {
  const [tripDetails, setTripDetails] = useState({});
  const [entryList, setEntryList] = useState([]);
  const { userId } = useParams();
  const [formattedDate, setFormattedDate] = useState(null);
  //   const { leaderId, fetchFollowingUsers } = useFollow();
  const dispatch = useDispatch();
  const leaderId = useSelector(store => store.follow.leaderId);
  const ID = Number(userId);

  //console.log("Leader ID from FullTrip: ", leaderId);
  //console.log("!!!!!!!", typeof(userId));
  useEffect(() => {
    dispatch(getFollowingUsers());
  }, [leaderId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3003/api/v1/trip/get-full-trip?userId=${userId}`);
        const data = await response.json();

        setTripDetails(data.tripDetails)
        setEntryList(data.records.rows);
        if (data.tripDetails && data.tripDetails.createdAt) {
          const dateToFormat = new Date(data.tripDetails.createdAt);
          if (!isNaN(dateToFormat)) {
            setFormattedDate(format(dateToFormat, "MMMM do, yyyy, hh:mm a"));

          }
        }
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      }
    }
    fetchData();
  }, [userId])
  return (
    <>
      {tripDetails &&
        <TripPreview
          username={tripDetails.username}
          createdAt={formattedDate}
          title={tripDetails.title}
          description={tripDetails.description}
          url={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${tripDetails.url}`}
          userId={ID}
        />

      }
      {

        entryList && (
          Array.isArray(entryList) && entryList.map(entry => (
            <div key={entry.id}>
              <Entry
                createdAt={entry.createdAt}
                textValue={entry.textValue}
                urlValue={entry.urlValue}
                recordTags={entry.recordTags}
              />
            </div>

          ))
        )
      }

    </>
  );
};

export default FullTrip;


