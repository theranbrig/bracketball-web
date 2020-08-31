import { toast } from 'react-toastify';

export const createErrorToast = (text) => {
  toast(text, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'rounded-lg',
    style: {
      borderRadius: '10px',
    },
  });
};
