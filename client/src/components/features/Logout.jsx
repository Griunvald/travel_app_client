import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import { logoutUser } from '../../features/user/userThunks';
import { useDispatch } from 'react-redux';
import Button from '../common/Button';

function Logout() {
  const { setUsername, setUserId, setCurrentTripId } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const actionResult = await dispatch(logoutUser());
      if(actionResult.type.includes('fulfilled')){
      navigate('/');
      showToast('Successfully logged out!' , {duration: 5000});
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <section>
        <Button variant="primary" name="Logout" onClick={handleLogout} />
      </section>
    </div>
  );
}

export default Logout;

