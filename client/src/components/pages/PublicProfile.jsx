import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../features/profile/profileThunks.js'
import { useParams } from 'react-router-dom';

function PublicProfile(){
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { about } = useSelector(store => store.profile.publicProfile)

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [userId]);
  return(
    <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
      <h2 className="font-medium text-xl text-left mb-6">About me</h2>
      <p>{about}</p>
    </div>
  );

}
export default PublicProfile;
