//import { useProfile } from '../../contexts/ProfileContext';
//import { useFollow } from '../../contexts/FollowContext';
//import { useUser } from '../../contexts/UserContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAbout } from '../../features/profile/profileSlice';
import { getProfile } from '../../features/profile/profileThunks';
import { getFollowStats } from '../../features/follow/followThunks';
import About from '../features/About';
import Logout from '../features/Logout';
import FollowStats from '../features/FollowStats';

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector(store => store.user.userId);
  //const { setAbout, setAvatar, setCountry, setHomeTown, setGender } = useProfile();
  //const { userId } = useUser();
 // const { getFollowStats } = useFollow();
  useEffect(() => {
    getFollowStats();
  },[]);

   useEffect(() => {
    dispatch(getProfile(userId));
//    const fetchProfileData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3003/api/v1/user/profile/get-profile?userId=${userId}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       
//       setAbout(data.about);
//       setAvatar(data.avatar);
//
//          console.log(data);
//
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//
//    };
//
//   fetchProfileData();
  }, [userId]);

  return (
    <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
      <About />
      <FollowStats />
      <Logout />
    </div>
  );
}

export default Profile;

