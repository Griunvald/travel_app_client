import React, { createContext, useContext, useState, useEffect } from 'react';

const TripsPreviewContext = createContext();

export const useTrips = () => useContext(TripsPreviewContext);

export const TripsProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3003/api/v1/trip/get-all-trips-preview');
                const data = await response.json();
                setTrips(data);
            } catch (error) {
                console.error('Failed to fetch trips:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <TripsPreviewContext.Provider value={{ trips, isLoading, error }}>
            {children}
        </TripsPreviewContext.Provider>
    );
};

