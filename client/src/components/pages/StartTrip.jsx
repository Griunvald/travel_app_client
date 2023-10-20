import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import LinkButton from '../common/LinkButton';
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

  const { userId, username, setCurrentTripId } = useUser();
   console.log("User id from app state: ", userId);
  const { handleCancel, preview, imageFile } = useImage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
    let awsData = {};
    console.log("User ID at Client Side:", userId);

    try {
        awsData = await getData('http://localhost:3003/api/v1/file/get-signed-url', userId);
        let { presignedAwsUrl, awsObjectKey } = awsData;

        console.log("Presigned AWS URL:", presignedAwsUrl);
        console.log("AWS Object Key:", awsObjectKey);

        awsObjectKey = awsObjectKey.replace('undefined', userId);

        await putData(presignedAwsUrl, imageFile);

        const newData = {
            userId,
            username,
            ...formData,
            url: awsObjectKey 
        };

        const responseFromPost = await postData('http://localhost:3003/api/v1/trip/create-trip', newData);
        const parsed = JSON.parse(responseFromPost);
        console.log(parsed.tripId);
        if(parsed.tripId) {
            setCurrentTripId(parsed.tripId);
           navigate('/current-trip');
        }
        
    } catch (err) {
        console.error("Error in handleSubmit:", err);
    }
};



  const postData = async (apiUrl, data) => {
    try {
      const response = await fetch(apiUrl, {
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

      return await response.json();
    } catch (error) {
      console.error('There was a problem with the post operation:', error);
    }
  };

  const putData = async (presignedAwsUrl, file) => {
    try {
      const response = await fetch(presignedAwsUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return presignedAwsUrl;
    } catch (error) {
      console.error('There was a problem with the put operation:', error);
    }
  };

  const getData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

        const result = await response.json();

   return {
        presignedAwsUrl: result.signedUrl.url,
        awsObjectKey: result.signedUrl.key
    };

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
        <ImageUpload label="Cover Image" />
        <div className="flex flex-col  md:flex-row justify-end gap-x-5 gap-y-4">
          {preview && <LinkButton name="Remove Image" type="secondary" onClick={handleCancel} />}
          <Button name="Publish" variant="primary" action="submit" />
        </div>
      </Form>
    </div>
  );
}

export default StartTrip;

