import { createContext, useContext } from 'react';
import { toast as toastify } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';

// Create the context
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  // Success toast
  const success = (message, options = {}) => {
    return toastify.success(
      <div className="flex items-center w-full">
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="text-green-500 flex-shrink-0"
        />
        <span className="truncate">{message}</span>
      </div>,
      options
    );
  }; // Error toast
  const error = (message, options = {}) => {
    return toastify.error(
      <div className="flex items-center w-full">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-red-500 flex-shrink-0"
        />
        <span className="truncate">{message}</span>
      </div>,
      options
    );
  }; // Info toast
  const info = (message, options = {}) => {
    return toastify.info(
      <div className="flex items-center w-full">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="text-blue-500 flex-shrink-0"
        />
        <span className="truncate">{message}</span>
      </div>,
      options
    );
  }; // Warning toast
  const warning = (message, options = {}) => {
    return toastify.warning(
      <div className="flex items-center w-full">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-amber-500 flex-shrink-0"
        />
        <span className="truncate">{message}</span>
      </div>,
      options
    );
  };

  // Dismiss toast
  const dismiss = (id) => {
    if (id) {
      toastify.dismiss(id);
    } else {
      toastify.dismiss();
    }
  };

  const toast = {
    success,
    error,
    info,
    warning,
    dismiss,
  };

  return (
    <ToastContext.Provider value={toast}>{children}</ToastContext.Provider>
  );
};

/**
 * Custom hook to use toast context
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
