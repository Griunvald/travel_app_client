import { useState, useEffect } from 'react';
import TripPreview from '../common/TripPreview';

function TripsList() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch('http://localhost:3003/api/v1/trip/get-all-trips-preview');
            const data = await response.json();
            setTrips(data);
           } catch (error) {
            console.error('Failed to fetch trips:', error);
      }
        }
        fetchData();
    },[])
    return (
        <>
        <h1>TripsList page</h1>
        { trips.map((trip)=> (

        <TripPreview 
            key={trip.id}
            title={trip.title}
            description={trip.description}
            url="https://placehold.co/600x400"
        />
        )) }
        </>
    );
};

export default TripsList;

