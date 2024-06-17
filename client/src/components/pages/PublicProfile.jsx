import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../features/profile/profileThunks.js'
import { useParams } from 'react-router-dom';

function PublicProfile(){
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [userId]);
  return(
     <div>
      Public profile
    </div>
  );

}
export default PublicProfile;
