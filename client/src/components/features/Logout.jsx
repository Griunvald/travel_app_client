import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/user/userThunks';
import { useDispatch } from 'react-redux';
import Button from '../common/Button';
import { useToast } from '../../hooks/useToast';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const actionResult = await dispatch(logoutUser());
      if (actionResult.type.includes('fulfilled')) {
        localStorage.removeItem('profile');
        navigate('/');
        toast({ message: 'Successfully logged out!', duration: 5000 });
      }
    } catch (error) {
      toast({ message: 'Action failed: ' + error.message, duration: 5000 });
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-end mb-4">
        <Button variant="primary" name="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
}

export default Logout;

