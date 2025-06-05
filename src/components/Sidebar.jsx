import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './ui/Modal';

import {
  faHome,
  faChartSimple,
  faShoppingCart,
  faBox,
  faChartLine,
  faMessage,
  faCog,
  faTable,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const SidebarItem = ({ icon, label, to, active, onClick }) => {
  // If onClick is provided, use it instead of Link
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all w-full text-left
        ${
          active
            ? 'bg-brand text-white'
            : 'text-gray-500 hover:bg-brand hover:text-white'
        }`}
      >
        <FontAwesomeIcon icon={icon} className="w-4" />
        <span className="text-sm">{label}</span>
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
      ${
        active
          ? 'bg-brand text-white'
          : 'text-gray-500 hover:bg-brand hover:text-white'
      }`}
    >
      <FontAwesomeIcon icon={icon} className="w-4" />
      <span className="text-sm">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { icon: faHome, label: 'Dashboard', path: '/app/dashboard' },
    { icon: faChartSimple, label: 'Analytics', path: '/app/analytics' },
    { icon: faShoppingCart, label: 'Orders', path: '/app/orders' },
    { icon: faBox, label: 'Products', path: '/app/products' },
    { icon: faChartLine, label: 'Reports', path: '/app/reports' },
    { icon: faTable, label: 'Test Page', path: '/app/testpage' },
    { icon: faMessage, label: 'Messages', path: '/app/messages' },
    { icon: faCog, label: 'Settings', path: '/app/settings' },
  ];

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    // Clear auth tokens
    localStorage.removeItem('token');

    // Close modal and navigate to login
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <>
      <div className="sticky top-0 left-0 h-screen w-60 bg-primary p-5 flex flex-col justify-between overflow-y-auto">
        {/* Top section with logo and name */}
        <div className="space-y-6">
          {/* Updated link to point to dashboard instead of / */}
          <Link to="/app/dashboard" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-brand"></div>
            <h1 className="font-bold text-lg">System Name</h1>
          </Link>

          {/* Navigation menu */}
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                to={item.path}
                active={pathname === item.path}
              />
            ))}
          </div>
        </div>

        {/* Bottom section with user profile, logout and system info */}
        <div className="space-y-4">
          {/* Logout button - now opens modal instead of immediate logout */}
          <SidebarItem
            icon={faSignOutAlt}
            label="Logout"
            onClick={handleLogoutClick}
          />

          {/* System info card */}
          <div className="bg-brand rounded-lg p-4 text-primary flex flex-col items-center">
            <div className="h-10 w-10 bg-white rounded-full mb-2"></div>
            <p className="font-medium text-sm">System Name</p>
            <button className="mt-2 bg-primary text-brand text-xs px-4 py-1 rounded-md font-medium">
              Version
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        type="confirm"
        size="small"
        footer={
          <>
            <button
              className="modal-btn modal-btn-secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>
            <button
              className="modal-btn modal-btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        }
      >
        <p>Are you sure you want to log out of the dashboard?</p>
        <p className="text-sm text-gray-500 mt-2">
          You will need to sign in again to access your account.
        </p>
      </Modal>
    </>
  );
};

export default Sidebar;
