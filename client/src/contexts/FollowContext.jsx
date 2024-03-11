import { createContext, useState, useContext, useEffect }  from 'react';

const FollowContext = createContext();

export const useFollow = () => useContext(FollowContext);

export const FollowProvider = ({ children }) => {

  const [followedUsers, setFollowedUsers] = useState([]);
  const [follower, setFollower] = useState(null);


const fetchFollowedUsers = async () => {
  try {
    const response = await fetch('http://localhost:3003/api/v1/follow/get-following', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });

    if(response.ok) {
      const data = await response.json();
      const { userId, followedUsersIds } = data.following;
      console.log( userId, followedUsersIds );

      setFollowedUsers(followedUsersIds); 
      setFollower(userId);
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


  const unfollowUser = async (leaderId) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/follow/unfollow-user', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ leaderId })
      })
      if(response.ok){
        await fetchFollowedUsers();
        console.log("Stopped to unfollow user with id: ", leaderId);
        } else {
        console.error("Failed to unfollow user: ", err); 
        }
      } catch (err){
        console.error("Error unfollowing user: ", err); 
      }
  }
  return (
    <FollowContext.Provider value={{ followUser, unfollowUser, fetchFollowedUsers, followedUsers, follower }}>
      { children }
    </FollowContext.Provider>
  )

};
