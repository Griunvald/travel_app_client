// In your TripsList component
import { useTrips } from '../../contexts/TripsPreviewContext';
import TripPreview from '../features/TripPreview';
import { timeAgo } from '../../utils/date.js';

function TripsList() {
    const { trips, isLoading, error } = useTrips();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading trips!</p>;

    return (
        <>
            {trips.map((trip) => (
                <TripPreview
                    key={trip.id}
                    userId={trip.userId}
                    username={trip.username}
                    createdAt={timeAgo(trip.createdAt)}
                    title={trip.title}
                    description={trip.description}
                    url={`https://travel-app-dev.s3.il-central-1.amazonaws.com/${trip.url}`}
                    link={`/full-trip/${trip.userId}`}
                />
            ))}
        </>
    );
}

export default TripsList;

