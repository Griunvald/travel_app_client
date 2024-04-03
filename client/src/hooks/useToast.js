import { useDispatch } from 'react-redux';
import { showToast, hideToast } from '../features/toast/toastSlice';

export const useToast = () => {
  const dispatch = useDispatch();
 
  const toast = ({message, options = {}}) => {
    dispatch( showToast({message, ...options}));
    setTimeout(() => dispatch(hideToast()), options.duration || 3000);
  };
  return { toast };
};
