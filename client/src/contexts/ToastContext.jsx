import { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, options = {}) => {
    setToast({ message, ...options });
    setTimeout(() => setToast(null), options.duration || 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && ReactDOM.createPortal(
        <div className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded">
          {toast.message}
        </div>,
        document.getElementById('toast-root')
      )}
    </ToastContext.Provider>
  );
};

