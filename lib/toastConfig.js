//Q:\PROJECTS\YourZeroesAndOnes\YZO_Main\lib\toastConfig.js
import { toast } from 'react-toastify';

// Custom toast configuration matching your admin theme
export const toastConfig = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
  style: {
    borderRadius: '12px',
    fontFamily: 'inherit',
  },
};

// Styled toast helpers
export const toastService = {
  success: (message, options = {}) => {
    toast.success(message, {
      ...toastConfig,
      className: 'toast-success',
      progressClassName: 'toast-progress-success',
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      ...toastConfig,
      className: 'toast-error',
      progressClassName: 'toast-progress-error',
      autoClose: 6000, // Errors stay longer
      ...options,
    });
  },

  info: (message, options = {}) => {
    toast.info(message, {
      ...toastConfig,
      className: 'toast-info',
      progressClassName: 'toast-progress-info',
      ...options,
    });
  },

  warning: (message, options = {}) => {
    toast.warning(message, {
      ...toastConfig,
      className: 'toast-warning',
      progressClassName: 'toast-progress-warning',
      ...options,
    });
  },

  // Promise-based toast for async operations
  promise: async (promise, messages, options = {}) => {
    return toast.promise(
      promise,
      {
        pending: messages.pending || 'Processing...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong',
      },
      {
        ...toastConfig,
        ...options,
      }
    );
  },
};
