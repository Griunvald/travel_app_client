import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinUser } from '../../features/user/userThunks';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setUserId } from '../../features/user/userSlice';
import { getProfileAndSaveToLocalStorage} from '../../features/profile/profileThunks.js'
import Button from '../common/Button';
import Link from '../common/Link';
import Input from '../common/Input';
import Form from '../common/Form';

function Join() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.fullname) errors.fullname = "Full name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const actionResult = await dispatch(joinUser(formData));
    if (joinUser.fulfilled.match(actionResult)) {
      const parsed = actionResult.payload;
      dispatch(setUsername(parsed.username));
      dispatch(setUserId(parsed.userId));
     dispatch(getProfileAndSaveToLocalStorage());
      navigate('/trips-list');
    } else if (joinUser.rejected.match(actionResult)) {
      setErrors({ form: actionResult.payload });
    }
  };

  return (
    <div className="w-full md:w-[400px] mx-auto md:shadow-soft md:border md:border-primary px-2 md:px-12 pt-6 pb-6 mt-6 md:mt-24">
      <h2 className="font-medium text-2xl text-center mb-6">Join Road Chronicles</h2>

      <Form onSubmit={handleSubmit}>
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <Input label="Full name" name="fullname" value={formData.fullname} onChange={handleChange} error={errors.fullname} />
        <Input label="Username" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />

        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

        <div className="flex flex-col md:flex-row md:justify-end">
          <Button name="Join" variant="primary" action="submit" />
        </div>
      </Form>

      <p className="mt-4 text-sm">Already have an account? <Link name="Log in" path="/login" /></p>
    </div>
  );
}

export default Join;

