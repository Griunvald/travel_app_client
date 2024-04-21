import { useRef } from 'react';
import CloseButton from './CloseButton';

const ImageUpload = ({ onFileSelect, preview, setPreview }) => {
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      if (onFileSelect) {
        onFileSelect(file);
      }
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setPreview(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
    fileInputRef.current.value = "";
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

