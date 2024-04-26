import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../features/profile/profileThunks';
import { getFollowStats } from '../../features/follow/followThunks';
import About from '../features/About';
import Logout from '../features/Logout';
import FollowStats from '../features/FollowStats';

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector(store => store.user.userId);
  useEffect(() => {
    getFollowStats();
  }, []);

  useEffect(() => {
    dispatch(getProfile());
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

