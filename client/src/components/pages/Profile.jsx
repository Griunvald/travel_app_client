import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowStats } from '../../features/follow/followThunks';
import About from '../features/About';
import Logout from '../features/Logout';
import FollowStats from '../features/FollowStats';
import TripsListHistory from '../features/TripsListHistory';
import AvatarUpload from '../features/AvatarUpload';

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector(store => store.user.userId);
  useEffect(() => {
    if (userId) {
      dispatch(getFollowStats());
    }
  }, []);

  return (
    <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
      <About />
      <AvatarUpload />
      <FollowStats />
      <TripsListHistory />
      <Logout />
    </div>
  );
}

export default Profile;

