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

    const tripInfo = getCookie('trip_info'); 
    if (tripInfo) {
      const parsedInfo = JSON.parse(tripInfo);
      setCurrentTripId(parsedInfo.tripId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId, currentTripId, setCurrentTripId}}>
      {children}
    </UserContext.Provider>
  );
}

