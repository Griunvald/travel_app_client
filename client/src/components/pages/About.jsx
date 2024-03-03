import { useProfile } from '../../contexts/ProfileContext';
import Form from '../common/Form';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

function About() {
  const {about, setAbout} = useProfile();
  console.log(about);

    const handleChange = (e) => {
      setAbout(e.target.value);
    };

    const handleSubmit = async () => {
        try {
      const data = {about}
        const response = await postData('http://localhost:3003/api/v1/user/profile/update-profile?userId=1', data)
      console.log(response);
        } catch(err){
           console.error(err);
        }
    }

    const postData = async (url, data) => {
      try {
        const response = await fetch(url, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
};
    return (
    <>
        <h1>About page</h1>
        <Form onSubmit={handleSubmit}>
        <Textarea
          value={about}
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
