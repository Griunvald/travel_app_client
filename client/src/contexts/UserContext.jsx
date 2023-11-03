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
        body: JSON.stringify({ userId })  
      });

const text = await response.text();
      if (!text) return;
      
      const data = JSON.parse(text);
      if (data && data.id) {
        setCurrentTripId(data.id); 
      }
    } catch (error) {
      console.error('Failed to fetch current trip:', error);
    }
  };

  if (userId) {
    fetchCurrentTrip();
  }
}, [userId]); 

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId, currentTripId, setCurrentTripId}}>
      {children}
    </UserContext.Provider>
  );
}

