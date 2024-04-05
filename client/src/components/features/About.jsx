import { useDispatch, useSelector } from 'react-redux';
import { setAbout } from '../../features/profile/profileSlice';
import { updateProfile } from '../../features/profile/profileThunks';
import Form from '../common/Form';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

function About() {
  const about = useSelector(store => store.profile.about);
  console.log(about);
  const userId = useSelector(store => store.user.userId);
  const dispatch = useDispatch();

    const handleChange = (e) => {
      dispatch(setAbout(e.target.value));
    };

    const handleSubmit = () => {
      dispatch(updateProfile({userId, about}))
    }

    return (
    <>
        <h1>About page</h1>
        <Form onSubmit={handleSubmit}>
        <Textarea
          value={about.about}
          onChange={handleChange}
        />
        <div className="flex flex-col md:flex-row md:justify-end">
            <Button name="Save" variant="primary" action="submit"/>
        </div>
      </Form>
    </>
    );
};

export default About;
