import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../common/Button";
import Form from "../common/Form";
import ImageUpload from "../common/ImageUpload";


function AvatarUpload() {

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useSelector(store => store.user);

  const handleFileSelect = (file) => {
    setImageFile(file);
    if (!file) {
      setImageFile(null);
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


  const handleSubmit = async () => {
    try {
      let awsData;
      awsData = await getData('http://localhost:3003/api/v1/files/signed-url', userId);
      console.log(awsData);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <ImageUpload onFileSelect={handleFileSelect} preview={preview} setPreview={setPreview} />
        <div className="flex flex-col md:flex-row justify-end gap-x-4 gap-y-4 pt-1">
          <Button name="Upload" variant="primary" type="submit"
            disabled={isLoading} inProgressText="UploadingPublishing..." />
        </div>
      </Form>
    </div>
  );
}

export default AvatarUpload;
