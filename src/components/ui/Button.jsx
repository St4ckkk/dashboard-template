import React from 'react';

/**
 * Reusable Button component that supports multiple variants and styles
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} props.icon - Optional icon component to display
 * @param {string} props.variant - Button style variant (primary, secondary, danger, outline, transparent)
 * @param {boolean} props.active - Whether the button is in active state
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 */
const Button = ({
  onClick,
  children,
  icon: Icon,
  variant = 'primary',
  active = false,
  fullWidth = false,
  size = 'md',
  className = '',
  ...props
}) => {
  // Base styles that apply to all buttons
  const baseStyles =
    'font-medium rounded-lg flex items-center justify-center transition-colors duration-200';

  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  // Style variations based on variant prop
  const variantStyles = {
    // Solid primary button - purple background
    primary:
      'bg-purple-600 text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-300/20',

    // Secondary button - gray background
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300/20',

    // Danger button - red styling
    danger:
      'bg-red-100 text-red-600 hover:bg-red-200 focus:ring-4 focus:ring-red-300/20',

    // Outline button - bordered with no background
    outline:
      'border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300/20',

    // Transparent button - no background or border
    transparent: 'bg-transparent text-gray-700 hover:bg-gray-100/20',

    // Tab button - for navigation tabs
    tab: active
      ? 'pb-4 px-1 border-b-2 border-purple-600 text-purple-600'
      : 'pb-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',

    // Settings tab button - for settings sidebar
    settingsTab: active
      ? 'bg-purple-600 text-white'
      : 'text-gray-700 hover:bg-gray-100',
  };

  // Banner button - for buttons on colored backgrounds (e.g. profile banner)
  if (variant === 'banner') {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${className}`}
        {...props}
      >
        {Icon && (React.isValidElement(Icon) ? Icon : <Icon size={16} />)}
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${fullWidth ? 'w-full' : ''}
        ${
          variant === 'settingsTab'
            ? 'flex items-center px-3 py-2 text-sm font-medium rounded-md w-full'
            : ''
        }
        ${className}
      `}
      {...props}
    >
      {' '}
      {Icon && (
        <span
          className={`${children ? 'mr-2' : ''} ${
            variant === 'settingsTab' ? 'mr-3 h-4 w-4' : ''
          } ${
            variant === 'settingsTab' && active
              ? 'text-white'
              : variant === 'settingsTab'
              ? 'text-gray-400'
              : ''
          }`}
        >
          {React.isValidElement(Icon) ? (
            Icon
          ) : (
            <Icon size={variant === 'settingsTab' ? 16 : 18} />
          )}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
