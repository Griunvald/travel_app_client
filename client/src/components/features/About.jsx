import { useDispatch, useSelector } from 'react-redux';
import { setAbout } from '../../features/profile/profileSlice';
import { updateProfile, getProfile } from '../../features/profile/profileThunks';
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
    dispatch(getProfile());
  }

  return (
    <>
      <h1>About page</h1>
      <Form onSubmit={handleSubmit}>
        <Textarea
          value={about}
          onChange={handleChange}
        />
        <div className="flex flex-col md:flex-row md:justify-end">
          <Button name="Save" variant="primary" action="submit" />
        </div>
      </Form>
    </>
  );
};

export default About;
