import { createContext, useState, useContext, useEffect }  from 'react';

const FollowContext = createContext();

export const useFollow = () => useContext(FollowContext);

export const FollowProvider = ({ children }) => {

  const [followedUsers, setFollowedUsers] = useState([]);


const fetchFollowedUsers = async () => {
  try {
    const response = await fetch('http://localhost:3003/api/v1/follow/get-following', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });

    if(response.ok) {
      const data = await response.json();
      const { following } = data;
      const users = following.map(item => item.username);
      setFollowedUsers(users); 
      console.log(users); 
    } else {
      console.error('Failed to fetch followed users with response status: ', response.status);
    }
  } catch(err) {
    console.error('Error fetching followed users:', err);
  }
}

  useEffect(() => {
    fetchFollowedUsers();
  }, []);


  const followUser = async (leaderId) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/follow/follow-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ leaderId })
      })
      if(response.ok){
        await fetchFollowedUsers();
        console.log("Start following user with id: ", leaderId);
        }
      } catch (err){
        console.log(err); 
      }
  }
  return (
    <FollowContext.Provider value={{ followUser, fetchFollowedUsers, followedUsers }}>
      { children }
    </FollowContext.Provider>
  )

};
