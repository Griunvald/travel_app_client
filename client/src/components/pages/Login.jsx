import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Link from '../common/Link'
import Input from '../common/Input';
import Form from '../common/Form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchCurrentTrip } from '../../features/user/userThunks';
import { useUser } from '../../contexts/UserContext';
import { useFollow } from '../../contexts/FollowContext';


function Login() {
  const [formData, setFormData] = useState({
    input: "",
    password: "",
  });

  const { setUsername, setUserId, setCurrentTripId, currentTripId } = useUser();
  const { fetchFollowingUsers } = useFollow();

  const navigate = useNavigate();
  const dispatch = useDispatch();
//  const userId = useSelector(store => store.user.userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const actionResult = await dispatch(loginUser(formData));
      console.log("actionResult", actionResult);
      console.log("actionResult.type", actionResult.type);
      if (actionResult.type.includes('fulfilled')) {
        const { userId } = JSON.parse(actionResult.payload);
        console.log("USER_ID: ",userId);
        console.log("ACTION_RESULT: ",actionResult);
        if(userId) {
           await dispatch(fetchCurrentTrip(userId));
           navigate('/trips-list')
        }
      }
      navigate('/landing')
    } catch (err) {
      console.error(err);
    }
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

        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}

        />

        <div className="flex flex-col md:flex-row md:justify-end">
          <Button name="Log in" variant="primary" action="submit" />
        </div>

      </Form>
      <p className="mt-4 text-sm">Don't have an account? <Link name="Join" path="/join" /></p>
    </div>
  );
}

export default Login;

