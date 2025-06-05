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
          : 'text-gray-500 hover:bg-brand hover:bg-opacity-10 hover:text-brand'
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

  const menuItems = [
    { icon: faHome, label: 'Dashboard', path: '/dashboard' },
    { icon: faChartSimple, label: 'Analytics', path: '/analytics' },
    { icon: faShoppingCart, label: 'Orders', path: '/orders' },
    { icon: faBox, label: 'Products', path: '/products' },
    { icon: faChartLine, label: 'Reports', path: '/reports' },
    { icon: faTable, label: 'Test Page', path: '/testpage' },
    { icon: faMessage, label: 'Messages', path: '/messages' },
    { icon: faCog, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="sticky top-0 left-0 h-screen w-60 bg-primary p-5 flex flex-col justify-between overflow-y-auto">
      {/* Top section with logo and name */}
      <div className="space-y-6">
        <Link to="/" className="flex items-center gap-3">
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
              active={
                pathname === item.path ||
                (pathname === '/' && item.path === '/dashboard')
              }
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
