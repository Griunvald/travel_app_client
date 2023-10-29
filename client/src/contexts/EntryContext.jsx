import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext'; // Importing useUser to get userId

const EntryContext = createContext();

export const EntryProvider = ({ children }) => {
  const [entryList, setEntryList] = useState([]);
  const { userId } = useUser();  // Get userId from UserContext
  
  const fetchData = async () => {
        const url = `http://localhost:3003/api/v1/trip/get-current-trip-records-with-tags?userId=${userId}`
        const response = await fetch(url);
        const list = await response.json()
        setEntryList(list);
  };
  
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);
  
  const refreshEntries = () => {
    fetchData();
  };
  
  return (
    <EntryContext.Provider value={{ entryList, refreshEntries }}>
      {children}
    </EntryContext.Provider>
  );
};

export const useEntries = () => {
  const context = useContext(EntryContext);
  if (!context) {
    throw new Error('useEntries must be used within an EntryProvider');
  }
  return context;
};

