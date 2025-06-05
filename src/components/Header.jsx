import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToast } from '../context/ToastContext';
import {
  faSearch,
  faBell,
  faChevronDown,
  faUser,
  faGear,
  faRightFromBracket,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({ title = 'Dashboard' }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="bg-primary w-full h-16 flex items-center justify-between px-6">
      {/* Left side - Page title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Right side - Search, notifications and user profile */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search here..."
            className="pl-10 pr-4 py-2 bg-gray-50 rounded-full w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/20"
          />
        </div>
        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FontAwesomeIcon icon={faBell} className="text-gray-500" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">1</span>
          </div>
        </div>{' '}
        {/* User profile with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="h-8 w-8 bg-brand rounded-full"></div>
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-gray-500">User Role</p>
            </div>
            <FontAwesomeIcon
              icon={dropdownOpen ? faChevronUp : faChevronDown}
              className="text-xs text-gray-500 ml-1 transition-transform"
            />
          </div>{' '}
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 dropdown-menu">
              <div className="py-1">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">User Name</p>
                  <p className="text-xs text-gray-500 mt-1">user@example.com</p>
                </div>{' '}
                <Link
                  to="/app/profile"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-4 h-4 text-gray-500"
                  />
                  <span>Profile</span>
                </Link>{' '}
                <div className="border-t border-gray-100"></div>{' '}
                <button
                  onClick={() => {
                    toast.info('Signed out successfully');
                    setTimeout(() => navigate('/login'), 1000);
                  }}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 w-full text-left"
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="w-4 h-4"
                  />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
