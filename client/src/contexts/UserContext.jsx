import { createContext, useContext, useState, useEffect } from 'react';
import getCookie from '../utils/cookieUtils.jsx';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [currentTripId, setCurrentTripId] = useState(null);

  useEffect(() => {
    const userInfo = getCookie('user_info'); 
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      setUsername(parsedInfo.username);
      setUserId(parsedInfo.userId);
    }

  }, []);

    useEffect(() => {
  const fetchCurrentTrip = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/trip/get-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })  // Assuming you have userId in scope
      });

      const data = await response.json();

      if (data && data.id) {
        setCurrentTripId(data.id);  // Assuming you have setCurrentTripId in scope
        // Set your hasCurrentTrip state or context value here
      }
    } catch (error) {
      console.error('Failed to fetch current trip:', error);
    }
  };

  if (userId) {  // Only attempt to fetch if userId is set
    fetchCurrentTrip();
  }
}, [userId]);  // Re-run whenever userId changes


  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId, currentTripId, setCurrentTripId}}>
      {children}
    </UserContext.Provider>
  );
}

