import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinUser } from '../../features/user/userThunks';
import { useDispatch } from 'react-redux';
import { setUsername, setUserId } from '../../features/user/userSlice';
import { getProfileAndSaveToLocalStorage } from '../../features/profile/profileThunks.js';
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
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isFormFilled = Object.values(formData).every(value => value.trim() !== '');
    setIsFormValid(isFormFilled && agreed);
  }, [formData, agreed]);

  const validateForm = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    } else if (!/^[a-z0-9]+$/.test(formData.username)) {
      errors.username = "Username can only contain lowercase letters and numbers";
    }
    if (!formData.fullname) errors.fullname = "Full name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!agreed) errors.agreed = "You must agree to the terms and conditions";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, username: value.toLowerCase() });
  };

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[400px] mx-auto md:shadow-soft md:border md:border-primary px-2 md:px-12 pt-6 pb-6 mt-6 md:mt-24">
      <h2 className="font-medium text-2xl text-center mb-6">Join Road Cronicles</h2>

      <Form onSubmit={handleSubmit}>
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <Input label="Full name" name="fullname" value={formData.fullname} onChange={handleChange} error={errors.fullname} />
        <Input label="Username" name="username" value={formData.username} onChange={handleUsernameChange} error={errors.username} />
        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />

        <div className="mt-4">
          <label className="flex items-center">
            <input type="checkbox" checked={agreed} onChange={handleCheckboxChange} className="mr-2" />
            <span>I agree to the <Link name="Terms and Conditions" path="/terms" /></span>
          </label>
          {errors.agreed && <p className="text-red-500 text-sm">{errors.agreed}</p>}
        </div>

        {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

        <div className="flex flex-col md:flex-row md:justify-end mt-4">
          <Button 
            name="Join" 
            variant="primary" 
            action="submit" 
            disabled={isLoading || !isFormValid} 
            inProgressText="Joining..."
            isLoading={isLoading}
          />
        </div>
      </Form>

      <p className="mt-4 text-sm">Already have an account? <Link name="Log in" path="/login" /></p>
    </div>
  );
}

export default Join;

