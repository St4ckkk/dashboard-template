import { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faExclamationTriangle,
  faCheckCircle,
  faInfoCircle,
  faQuestion,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  type = 'default', // default, confirm, info, success, warning, error, logout
  size = 'medium', // small, medium, large
  showCloseButton = true,
  disableOutsideClick = false,
  footer,
  closeOnEsc = true,
}) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose, closeOnEsc]);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget && !disableOutsideClick) {
      onClose();
    }
  };
  // Modal icon based on type
  const getModalIcon = () => {
    switch (type) {
      case 'success':
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-lg"
          />
        );
      case 'warning':
        return (
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-amber-500 text-lg"
          />
        );
      case 'error':
        return (
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-red-500 text-lg"
          />
        );
      case 'info':
        return (
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="text-blue-500 text-lg"
          />
        );
      case 'confirm':
        return (
          <FontAwesomeIcon icon={faQuestion} className="text-brand text-lg" />
        );
      case 'logout':
        return (
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="text-gray-600 text-lg"
          />
        );
      default:
        return null;
    }
  };

  // Get size class
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'max-w-xs';
      case 'large':
        return 'max-w-xl';
      case 'medium':
      default:
        return 'max-w-md';
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      <div className="modal-overlay" onClick={handleOutsideClick}>
        <div
          className={`modal-container ${getSizeClass()}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-title-container">
              {getModalIcon() && (
                <span className="modal-icon">{getModalIcon()}</span>
              )}
              {title && <h3 className="modal-title">{title}</h3>}
            </div>

            {showCloseButton && (
              <button onClick={onClose} className="modal-close-btn">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>

          <div className="modal-content">{children}</div>

          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </Fragment>,
    document.body
  );
};

export default Modal;
