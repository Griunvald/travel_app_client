import { useState, useEffect } from 'react';
import { addTag, clearTags } from '../../features/tag/tagsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '../../hooks/useToast';
import TabButton from '../common/TabButton';
import Button from '../common/Button';
import Textarea from '../common/Textarea';
import ImageUpload from '../common/ImageUpload';
import TabContainer from '../common/TabContainer';
import Tab from '../common/Tab';
import TagsArea from '../common/TagsArea';
import Form from '../common/Form';
import { getEntryList } from '../../features/entry/entryThunks';

const AddEntry = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const tags = useSelector(store => store.tag.tags);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Text');

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    text: "",
    tags: tags,
  });

  const { userId } = useSelector(store => store.user);
  const { currentTripId } = useSelector(store => store.trip);

  const handleFileSelect = (file) => {
    setImageFile(file);
    if (!file) {
      setImageFile(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({ ...prevFormData, tags: tags }));
    if (activeTab === "Text") {
      setPreview(null);
      setImageFile(null);
    }
    if (activeTab === "Image") {
      setFormData({ text: "", tags });
    }
  }, [tags, activeTab]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let awsData;
      if (activeTab === "Image") {
        awsData = await getData('http://localhost:3003/api/v1/file/get-signed-url', userId);
        await putData(awsData.presignedAwsUrl, imageFile);
      }

      const newData = {
        userId,
        tripId: currentTripId,
        tags: formData.tags,
        type: activeTab === "Text" ? "text" : "url",
        data: activeTab === "Text" ? formData.text : awsData ? awsData.awsObjectKey : "",
      };

      const responseFromPost = await postData('http://localhost:3003/api/v1/records/', newData);

      if (responseFromPost.message === "Record created!") {
        setFormData({ text: "" })
        setPreview(null);
        setImageFile(null);
        dispatch(addTag([]));
        dispatch(clearTags());
        dispatch(getEntryList(userId));
        toast({ message: 'Success! Your entry has been added!', duration: 5000 });
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    } finally {
      setIsLoading(false);
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
    <div className="w-full md:w-[700px] mx-auto pt-2 mb-4 border border-2 shadow-soft p-2">
      <TabButton tabName="Text" setActiveTab={setActiveTab} activeTab={activeTab} />
      <TabButton tabName="Image" setActiveTab={setActiveTab} activeTab={activeTab} />

      <Form onSubmit={handleSubmit}>
        <TabContainer activeTab={activeTab}>
          <Tab tabName="Text">
            <Textarea
              name="text"
              rows="3"
              height="48"
              value={formData.text}
              onChange={handleChange}
            />
          </Tab>
          <Tab tabName="Image">
            <ImageUpload onFileSelect={handleFileSelect} preview={preview} setPreview={setPreview} />
          </Tab>
        </TabContainer>
        <TagsArea />
        <div className="flex flex-col md:flex-row justify-end gap-x-5 gap-y-4 pt-4">
          <Button name="Publish" variant="primary" type="submit"
            disabled={isLoading} inProgressText="Publishing..." />
        </div>
      </Form>
      <div className="mt-4">1. Write Text or Upload Image, 2. Add tags, 3. Hit 'Publish' when done.</div>
    </div>
  );
};

export default AddEntry;

