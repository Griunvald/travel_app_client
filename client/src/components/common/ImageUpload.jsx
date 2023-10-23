import { useState, useRef } from 'react';
import { useImage } from '../../contexts/ImageContext.jsx';

const ImageUpload = ({ onUpload, label }) => {
  const { preview, setPreview, imageFile, setImageFile } = useImage();
  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (onUpload) {
        onUpload(file);
      }
    } else {
      setImageFile(null);
      setPreview(null);
    }
    fileInputRef.current.value = null;
  };

  const handleCancel = () => {
    setPreview(null); 
    if (onUpload) {
      onUpload(null);
    }
    fileInputRef.current.value = null; 
  };

  return (
      <>
      <label className="text-gray-800" htmlFor="imageUpload">{label}</label>
    <div className="relative flex flex-col items-center justify-center mb-6 h-48 border border-primary">
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

