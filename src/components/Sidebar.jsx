import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faHome,
  faChartSimple,
  faShoppingCart,
  faBox,
  faChartLine,
  faMessage,
  faCog,
  faTable,
} from '@fortawesome/free-solid-svg-icons';

const SidebarItem = ({ icon, label, to, active }) => {
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
  const pathname = location.pathname;

  // Updated paths to use /app/ prefix
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

  return (
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

      {/* Bottom section with system info */}
      <div className="bg-brand rounded-lg p-4 text-primary flex flex-col items-center">
        <div className="h-10 w-10 bg-white rounded-full mb-2"></div>
        <p className="font-medium text-sm">System Name</p>
        <button className="mt-2 bg-primary text-brand text-xs px-4 py-1 rounded-md font-medium">
          Version
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
