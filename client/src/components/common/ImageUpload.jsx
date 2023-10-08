import { useState, useRef } from 'react';
import { useImage } from '../../contexts/ImageContext.jsx';

const ImageUpload = ({ onUpload, label }) => {
  const { preview, setPreview } = useImage();
  const fileInputRef = useRef(null); 

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (onUpload) {
        onUpload(file);
      }
    } else {
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
      <label htmlFor="imageUpload">{label}</label>
    <div className="relative flex flex-col items-center justify-center mb-4 h-48" 
      style={{
 backgroundImage: 'repeating-linear-gradient(13deg, #6b7280, #6b7280 24px, transparent 24px, transparent 35px, #6b7280 35px), repeating-linear-gradient(103deg, #6b7280, #6b7280 24px, transparent 24px, transparent 35px, #6b7280 35px), repeating-linear-gradient(193deg, #6b7280, #6b7280 24px, transparent 24px, transparent 35px, #6b7280 35px), repeating-linear-gradient(283deg, #6b7280, #6b7280 24px, transparent 24px, transparent 35px, #6b7280 35px)',
    backgroundSize: '1px 100%, 100% 1px, 1px 100% , 100% 1px',
    backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
    backgroundRepeat: 'no-repeat'
      }}>
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
        <div className="text-center text-gray-600">
          <p>Click or drag to upload</p>
        </div>
      )}
    </div>
      </>
  );
};

export default ImageUpload;

