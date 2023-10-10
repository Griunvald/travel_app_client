import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import LinkButton from '../common/LinkButton';
import  Link  from '../common/Link'
import Textarea from '../common/Textarea';
import Form from '../common/Form';
import ImageUpload from '../common/ImageUpload';
import { useUser } from '../../contexts/UserContext';
import { useImage } from '../../contexts/ImageContext';


function StartTrip() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const { setUsername } = useUser();
    const { handleCancel, preview, imageFile } = useImage();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
        const response = await postData('http://localhost:3003/api/v1/auth/login', formData)
            const username = JSON.parse(response);
            if(username) {
                setUsername(username);
               navigate('/');
            }
        } catch(err){
           console.log(err);
        }
    }

    const postData = async (url, data) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
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
        <div className="w-full md:w-[600px] mx-auto md:border md:border-primary md:shadow-soft px-2 md:px-12 pt-6 pb-6 mt-6 md:mt-24">
            <h2 className="font-medium text-2xl text-center mb-6">Ready for a New Journey? Let’s Get Started!</h2>

            <Form onSubmit={handleSubmit}>

                <Textarea
                    label="Trip Title"
                    name="title"
                    rows="1" 
                    value={formData.title}
                    onChange={handleChange}
                
            />

                <Textarea
                    label="Trip Description"
                    name="description"
                    rows="3" 
                    value={formData.description}
                    onChange={handleChange}
                
            />

            <ImageUpload
                label="Cover Image"
            />

<div className="flex flex-col  md:flex-row justify-end gap-x-5 gap-y-4">
             {preview && <LinkButton name="Remove Image" type="secondary" onClick={handleCancel} />}
            <Button name="Publish" variant="primary" action="submit"/>
        </div>

            </Form>
        </div>
    );
}

export default StartTrip;

