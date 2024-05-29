import { useDispatch, useSelector } from 'react-redux';
import { setAbout } from '../../features/profile/profileSlice';
import { updateProfile, getProfileAndSaveToLocalStorage, getProfileFromLocalStorage } from '../../features/profile/profileThunks';
import Form from '../common/Form';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

function About() {
  const about = useSelector(store => store.profile.about);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setAbout(e.target.value));
  };

  const handleSubmit = async () => {
    await dispatch(updateProfile({ about }))
    await dispatch(getProfileAndSaveToLocalStorage());
    await dispatch(getProfileFromLocalStorage());
  }
  return (

    <div className='mb-10'>
      <h2 className="font-medium text-xl text-left mb-6">About me</h2>
      <Form onSubmit={handleSubmit}>
        <Textarea
          value={about}
          onChange={handleChange}
          placeholder={'Write about yourself'}
        />
        <div className="flex flex-col md:flex-row md:justify-end mt-1">
          <Button name="Save" variant="primary" action="submit" />
        </div>
      </Form>
    </div>
  );
};

export default About;
