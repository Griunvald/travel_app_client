import { useRef } from 'react';
import CloseButton from './CloseButton';
import imageCompression from 'browser-image-compression';

const ImageUpload = ({ onFileSelect, preview, setPreview }) => {
  const fileInputRef = useRef(null);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        const previewUrl = URL.createObjectURL(compressedFile);
        setPreview(previewUrl);
        if (onFileSelect) {
          onFileSelect(compressedFile);
        }
      } catch (error) {
        console.error('Error during image compression:', error);
        handleCancel();
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

