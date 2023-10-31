import { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { timeAgo } from '../../utils/date.js';
import TripPreview from '../features/TripPreview';
import AddEntry from '../features/AddEntry';
import EntryList from '../features/EntryList';

function FullTrip() {
    const userId = 1;

    useEffect(() => {
        const fetchData = async () => {
            if (!userId){
                return;
            }

        try {
            const response = await fetch(`http://localhost:3003/api/v1/trip/get-full-trip?userId=${userId}`);
            const data = await response.json();
            const { records, tripDetails } = await data;

            console.log(records.rows);
            console.log(tripDetails);
           } catch (error) {
            console.error('Failed to fetch trips:', error);
      }
        }
        fetchData();
    },[userId])
    return (
      <>
        Full trip
    </>
    );
};

export default FullTrip;


