import  { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const useImage = () => {
    const context = useContext(ImageContext);
    return useContext(ImageContext);
};

export const ImageProvider = ({ children }) => {
  const [preview, setPreview] = useState(null);

  const handleCancel = () => {
    setPreview(null);
  };

  return (
    <ImageContext.Provider value={{ preview, setPreview, handleCancel }}>
      {children}
    </ImageContext.Provider>
  );
};

