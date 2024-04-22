import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/Button';
import Textarea from '../common/Textarea';
import Form from '../common/Form';
import ImageUpload from '../common/ImageUpload';
import { setCurrentTripId } from '../../features/trip/tripSlice';

function StartTrip() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, username } = useSelector(store => store.user);

  const handleFileSelect = (file) => {
    setImageFile(file);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    let awsData = {};

    try {
      awsData = await getData('http://localhost:3003/api/v1/file/get-signed-url', userId);
      let { presignedAwsUrl, awsObjectKey } = awsData;

      awsObjectKey = awsObjectKey.replace('undefined', userId);

      await putData(presignedAwsUrl, imageFile);

      const newData = {
        ...formData,
        url: awsObjectKey
      };

      const responseFromPost = await postData('http://localhost:3003/api/v1/trips', newData);
      const parsed = JSON.parse(responseFromPost);
      if (parsed.tripId) {
        dispatch(setCurrentTripId(parsed.tripId))
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
          maxLength={100}
          showCharacterCount={true}
          value={formData.title}
          onChange={handleChange}
        />
        <Textarea
          label="Trip Description"
          name="description"
          rows="3"
          maxLength={300}
          showCharacterCount={true}
          value={formData.description}
          onChange={handleChange}
        />
        <ImageUpload onFileSelect={handleFileSelect} preview={preview} setPreview={setPreview} />
        <div className="flex flex-col  md:flex-row justify-end gap-x-5 gap-y-4">
          <Button name="Publish" variant="primary" action="submit" />
        </div>
      </Form>
    </div>
  );
}

export default StartTrip;

