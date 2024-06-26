import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileById } from '../../features/profile/profileThunks.js'
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function PublicProfile(){
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { about } = useSelector(store => store.profile.publicProfile)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfileById(userId));
  }, [userId]);

    const handleBackClick = () => {
    const { from, scrollPosition } = location.state || {};
    if (from) {
      navigate(from, {state: { scrollPosition }});
    } else {
      navigate('/trips-list');
    }
  };

  return(
    <div className="w-full md:w-[700px] mx-auto pt-4 md:pt-6 mb-4">
      <h2 className="font-medium text-xl text-left mb-6">About me</h2>
      <p>{about}</p>
       <button onClick={handleBackClick} className="underline decoration-solid font-medium mt-2">Back</button>
    </div>
  );

}
export default PublicProfile;
