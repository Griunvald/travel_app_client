import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Link from '../common/Link'
import Input from '../common/Input';
import Form from '../common/Form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/user/userThunks';

import { getCurrentTripId } from '../../features/trip/tripThunks';

function Login() {
  const [formData, setFormData] = useState({
    input: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const actionResult = await dispatch(loginUser(formData));
      console.log(actionResult);
      if (actionResult.type.includes('fulfilled')) {
        const userId = actionResult.payload.userInfo.userId;
        const profile = actionResult.payload.profile;
        localStorage.setItem('profile', JSON.stringify(profile));
        if (userId) {
          await dispatch(getCurrentTripId(userId));
          navigate('/trips-list')
        }
      }
    } catch (err) {
      console.error(err);
      navigate('/landing')
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

