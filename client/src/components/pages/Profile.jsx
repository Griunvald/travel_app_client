import { Link } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import { useFollow } from '../../contexts/FollowContext';
import { useUser } from '../../contexts/UserContext';
import { useState, useEffect } from 'react';
import About from '../features/About';
import Logout from '../features/Logout';

function Profile({ children }) {
  const { setAbout, setAvatar, setCountry, setHomeTown, setGender } = useProfile();
  const { getFollowStats } = useFollow();
  const { userId } = useUser();
  useEffect(() => {
    getFollowStats();
  },[]);

   useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/v1/user/profile/get-profile?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        setAbout(data.about);
        setAvatar(data.avatar);
        setCountry(data.country);
        setHomeTown(data.homeTown);
        setGender(data.gender);

          console.log(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
      <About />
      <Logout />
    </div>
  );
}

export default Profile;

