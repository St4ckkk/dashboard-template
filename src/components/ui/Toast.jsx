import React from 'react';
import { ToastContainer as ToastifyContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Custom Toast Container component that wraps react-toastify
 * with our application's styling directives
 */
const ToastContainer = () => {
  return (
    <ToastifyContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="light"
      icon={false} // We're using our own icons
      className="toast-container"
      toastClassName="toast-item"
      bodyClassName="toast-body"
      progressClassName="toast-progress"
      closeButton={false} // Remove default close button
    />
  );
};

export default ToastContainer;
