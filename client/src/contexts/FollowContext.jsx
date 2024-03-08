import { createContext, useState, useContext, useEffect }  from 'react';

const FollowContext = createContext();

export const useFollow = () => useContext(FollowContext);

export const FollowProvider = ({ children }) => {

  const followUser = async (leaderId, followerId) => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/follow/follow-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({ leaderId, followerId })
      })
      if(response.ok){
        console.log("Start following user with id: ", followerId);
        }
      } catch (err){
        console.log(err); 
      }
  }
  return (
    <FollowContext.Provider value={{ followUser }}>
      { children }
    </FollowContext.Provider>
  )

};
