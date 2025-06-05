import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBell,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({ title = 'Dashboard' }) => {
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
        </div>

        {/* User profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-8 w-8 bg-brand rounded-full"></div>
          <div>
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-gray-500">User Role</p>
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-xs text-gray-500 ml-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
