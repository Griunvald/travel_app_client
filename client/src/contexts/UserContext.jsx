import { createContext, useContext, useState, useEffect } from 'react';
import getCookie from '../utils/cookieUtils.jsx';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userInfo = getCookie('user_info'); 
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      setUsername(parsedInfo.username);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

