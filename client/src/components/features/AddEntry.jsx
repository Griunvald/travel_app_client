import { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useImage } from '../../contexts/ImageContext';
import { useTags } from '../../contexts/TagsContext';
import TabButton from '../common/TabButton';
import Button from '../common/Button';
import Textarea from '../common/TextArea';
import ImageUpload from '../common/ImageUpload';
import TabContainer from '../common/TabContainer';
import Tab from '../common/Tab';
import TagsArea from '../common/TagsArea';
import Form from '../common/Form';

const AddEntry = () => {
  const { tags } = useTags();
  const [activeTab, setActiveTab] = useState('textArea');
  const [formData, setFormData] = useState({
    text: "",
    tags: tags,
  });
  const { userId, currentTripId } = useUser();
  const { handleCancel, preview, imageFile } = useImage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, tags: tags }));
  }, [tags]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        userId,
        tripId: currentTripId,
        tags: formData.tags,
        type: activeTab === "textArea" ? "text" : "url",
        data: activeTab === "textArea" ? formData.text : "",
      };

      if (activeTab === "imageUpload") {
        const awsData = await getData('http://localhost:3003/api/v1/file/get-signed-url', userId);
        await putData(awsData.presignedAwsUrl, imageFile);
        newData.data = awsData.awsObjectKey;
      }

      const responseFromPost = await postData('http://localhost:3003/api/v1/record/create-record', newData);
      // Handle the response as needed
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
    <div className="w-full md:w-[800px] mx-auto pt-4 md:pt-6 mb-4 border border-2 shadow-soft p-2">
      <TabButton tabName="Text" setActiveTab={setActiveTab} activeTab={activeTab} />
      <TabButton tabName="Image" setActiveTab={setActiveTab} activeTab={activeTab} />

      <Form onSubmit={handleSubmit}>
        <TabContainer activeTab={activeTab}>
          <Tab tabName="Text">
            <Textarea
              name="text"
              rows="3"
              value={formData.text}
              onChange={handleChange}
            />
          </Tab>
          <Tab tabName="Image">
            <ImageUpload />
          </Tab>
        </TabContainer>
        <TagsArea />
        <div className="flex flex-col md:flex-row justify-end gap-x-5 gap-y-4">
          <Button name="Publish" variant="primary" type="submit" />
        </div>
      </Form>
      <div>1. Write Text or Upload Image, 2. Add tags, 3. Hit 'Publish' when done.</div>
    </div>
  );
};

export default AddEntry;

