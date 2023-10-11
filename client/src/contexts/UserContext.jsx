import { createContext, useContext, useState, useEffect } from 'react';
import getCookie from '../utils/cookieUtils.jsx';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userInfo = getCookie('user_info'); 
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      setUsername(parsedInfo.username);
      setUserId(parsedInfo.userId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId}}>
      {children}
    </UserContext.Provider>
  );
}

