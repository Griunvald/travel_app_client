import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";
import Form from "../common/Form";
import ImageUpload from "../common/ImageUpload";
import { updateProfile } from "../../features/profile/profileThunks";
import { getProfileAndSaveToLocalStorage, getProfileFromLocalStorage } from "../../features/profile/profileThunks";


function AvatarUpload() {

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useSelector(store => store.user);
  const dispatch = useDispatch();

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


  const handleSubmit = async () => {
    try {
      let awsData;
      awsData = await getData(`${apiUrl}/files/signed-url`, userId);
      await putData(awsData.presignedAwsUrl, imageFile);
      await dispatch(updateProfile({ avatar: awsData.awsObjectKey }))
      await dispatch(getProfileAndSaveToLocalStorage());
      await dispatch(getProfileFromLocalStorage());
      setPreview(null);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="font-medium text-xl text-left mb-6">Avatar</h2>
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
