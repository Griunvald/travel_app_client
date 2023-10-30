import { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { timeAgo } from '../../utils/date.js';
import { useUser } from '../../contexts/UserContext';
import TripPreview from '../features/TripPreview';
import AddEntry from '../features/AddEntry';
import EntryList from '../features/EntryList';

function CurrentTrip() {
    const { username, userId } = useUser();
    const [trip, setTrip] = useState('');
    const formattedDate = trip ? format(new Date(trip.createdAt), "MMMM do, yyyy, hh:mm a") : '';

    useEffect(() => {
        const fetchData = async () => {
            if (!userId){
                return;
            }

        try {
            const response = await fetch('http://localhost:3003/api/v1/trip/get-trip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId })

            });
            const data = await response.json();

            setTrip(data);
            console.log("data: ", data);
            console.log("trip: ", trip);
           } catch (error) {
            console.error('Failed to fetch trips:', error);
      }
        }
        fetchData();
    },[userId])
    return (
      <>
        <TripPreview 
            key={trip.id}
            username={username}
            createdAt={formattedDate}
            title={trip.title}
            description={trip.description}
            url={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${trip.url}`}
        />
        
        <EntryList />
        <AddEntry />
    </>
    );
};

export default CurrentTrip;

