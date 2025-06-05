import { useState } from 'react';
import { Link } from 'react-router-dom';

// You'll need to install FontAwesome icons as discussed earlier
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faChartSimple,
  faShoppingCart,
  faBox,
  faChartLine,
  faMessage,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
      ${active ? 'bg-brand text-white' : 'text-gray-500 hover:bg-brand '}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} className="w-4" />
      <span className="text-sm">{label}</span>
    </div>
  );
};

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { icon: faHome, label: 'Dashboard' },
    { icon: faChartSimple, label: 'Lorem ipsum' },
    { icon: faShoppingCart, label: 'Lorem ipsum' },
    { icon: faBox, label: 'Lorem ipsum' },
    { icon: faChartLine, label: 'Lorem ipsum' },
    { icon: faMessage, label: 'Lorem ipsum' },
    { icon: faCog, label: 'Lorem ipsum' },
  ];

  return (
    <div className="sticky top-0 left-0 h-screen w-60 bg-primary p-5 flex flex-col justify-between overflow-y-auto">
      {/* Top section with logo and name */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-brand"></div>
          <h1 className="font-bold text-lg">System Name</h1>
        </div>

        {/* Navigation menu */}
        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
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
