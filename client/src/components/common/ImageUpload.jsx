import React, { useState } from 'react';

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);

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
  };

  const handleCancel = () => {
    setPreview(null);
    if (onUpload) {
      onUpload(null);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 mb-4 h-48" style={{
  border: '2px dashed',
  borderImage: `url(data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'
      width=\'10\' height=\'10\' viewBox=\'0 0 10 10\' ><rect width=\'10\' height=\'10\'
      rx=\'5\' fill=\'%23FFF\'/><rect x=\'5\' width=\'5\' height=\'10\' rx=\'5\' fill=\'%23000\'/></svg>)`,
  borderImageSlice: 1,
  borderImageWidth: 10,
  borderImageOutset: 0,
  borderImageRepeat: 'stretch'
}}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleChange} 
        className="absolute opacity-0 w-full h-full cursor-pointer"
      />
      {preview ? (
        <>
          <img src={preview} alt="Preview" className="max-w-full max-h-36" />
          <button 
            onClick={handleCancel} 
            className="mt-2 text-red-500 text-sm"
          >
            Choose another image
          </button>
        </>
      ) : (
        <div className="text-center text-gray-600">
          <p>Capture your journey. Click or drag to upload</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

