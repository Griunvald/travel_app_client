import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
//import { useToast } from '../../contexts/ToastContext';
import { logoutUser } from '../../features/user/userThunks';
import { useDispatch } from 'react-redux';
import Button from '../common/Button';
import { useToast } from '../../hooks/useToast';

function Logout() {
  const { setUsername, setUserId, setCurrentTripId } = useUser();
//  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const actionResult = await dispatch(logoutUser());
      if(actionResult.type.includes('fulfilled')){
      navigate('/');
     // showToast('Successfully logged out!' , {duration: 5000});
      toast({message:'Successfully logged out!',  duration: 5000 });
      }
    } catch (error) {
      toast({message:'Action failed: ' + error.message,  duration: 5000 });
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

