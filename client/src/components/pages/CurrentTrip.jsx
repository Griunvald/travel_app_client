import { useState, useEffect } from 'react';
import { timeAgo } from '../../utils/date.js';
import { useUser } from '../../contexts/UserContext';
import TripPreview from '../features/TripPreview';
import AddEntry from '../features/AddEntry';
import EntryList from '../features/EntryList';

function CurrentTrip() {
    const { username, userId } = useUser();
    const [trip, setTrip] = useState('');
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
            createdAt={timeAgo(trip.createdAt)}
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

