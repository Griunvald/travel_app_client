import { useState, useRef } from 'react';
import CloseButton from './CloseButton';

const ImageUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file is: ", file);
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (onFileSelect) {
        onFileSelect(file);
      }
    } else {
      setImageFile(null);
      setPreview(null);
      if (onFileSelect) {
        onFileSelect(null);
      }
    }
    fileInputRef.current.value = null;
  };

  const handleCancel = () => {
    setPreview(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
    fileInputRef.current.value = null;
  };
  return (

    <>
      <div className="relative flex flex-col items-center justify-center mb-4 h-48 border border-primary">
        <input
          name="imageUpload"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute opacity-0 w-full h-full cursor-pointer"
        />
        {preview ? (
          <>
            <CloseButton onClick={handleCancel} />
            <img src={preview} alt="Preview" className="max-w-full max-h-full" />
          </>
        ) : (
          <div className="text-center text-gray-700">
            <p>Click or drag to upload</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUpload;

