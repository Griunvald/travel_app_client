import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

export const Toast = () => {
  const message = useSelector(store => store.toast.message);
  if (!message) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded">
      {message}
    </div>,
    document.getElementById('toast-root')
  );
}
 
export default Toast;
