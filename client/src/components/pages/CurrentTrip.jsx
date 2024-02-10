import { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { useUser } from '../../contexts/UserContext';
import TripPreview from '../features/TripPreview';
import AddEntry from '../features/AddEntry';
import EntryList from '../features/EntryList';

function CurrentTrip() {
    const { username, userId } = useUser();
    const [trip, setTrip] = useState(null); // Initialize trip as null

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
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
        };

        fetchData();
    }, [userId]);

    // Only render TripPreview when trip is not null and has valid data
    return (
      <>
        {trip && (
            <TripPreview 
                key={trip.id}
                username={username}
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
