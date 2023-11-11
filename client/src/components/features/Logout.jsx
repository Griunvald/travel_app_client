import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useToast } from '../../contexts/ToastContext';
import Button from '../common/Button';

function Logout() {
  const url = 'http://localhost:3003/api/v1/auth/logout';
  const { setUsername, setUserId, setCurrentTripId } = useUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setUsername('');
      setUserId(null);
      setCurrentTripId(null);
      navigate('/');
      showToast('Successfully logged out!' , {duration: 5000});
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
