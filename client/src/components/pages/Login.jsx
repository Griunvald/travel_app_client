import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Link from '../common/Link';
import Input from '../common/Input';
import Form from '../common/Form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, initializeUser } from '../../features/user/userThunks';
import { getProfileAndSaveToLocalStorage } from '../../features/profile/profileThunks';
import { getCurrentTripId } from '../../features/trip/tripThunks';

function Login() {
  const [formData, setFormData] = useState({
    input: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, username, error: errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if user is already logged in
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getProfileAndSaveToLocalStorage()).then(() => {
        navigate('/trips-list');
      });
    }
  }, [dispatch, userId, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.input) errors.input = "Username or email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'input' ? value.toLowerCase() : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsLoading(true);
    try {
      const actionResult = await dispatch(loginUser(formData));
      if (actionResult.type.includes('fulfilled')) {
        const userId = actionResult.payload.userInfo.userId;
        await dispatch(getCurrentTripId(userId));
        await dispatch(getProfileAndSaveToLocalStorage());
        navigate('/trips-list');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (userId) {
    return null;
  }

  return (
    <div className="w-full md:w-[400px] mx-auto md:border md:border-primary md:shadow-soft px-1 md:px-12 pt-6 pb-6 mt-6 md:mt-24">
      <h2 className="font-medium text-2xl text-center mb-6">Log In to Road Cronicles</h2>

      <Form onSubmit={handleSubmit}>
        <Input
          label="Username or email"
          name="input"
          value={formData.input}
          onChange={handleChange}
          error={errors.input}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <div className="flex flex-col md:flex-row md:justify-end">
          <Button 
            name={isLoading ? "Logging in..." : "Log in"} 
            variant="primary" 
            action="submit" 
            disabled={isLoading} 
            inProgressText="Logging in..."
            isLoading={isLoading}
          />
        </div>
      </Form>
      <p className="mt-4 text-sm">Don't have an account? <Link name="Join" path="/join" /></p>
    </div>
  );
}

export default Login;

