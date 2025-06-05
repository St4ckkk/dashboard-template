import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({
  title,
  subtitle,
  subtitleSecondary,
  children,
  className = '',
  headerAction,
  icon,
  variant,
}) => {
  // For cards with icon variant (the colored stat cards)
  if (variant) {
    return (
      <div className={`card card-stat card-stat-${variant} ${className}`}>
        <div className={`card-icon card-icon-${variant}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <p className={`card-text-${variant} text-sm`}>{title}</p>
        <h3 className={`card-text-${variant} text-xl font-semibold mb-1`}>
          {subtitle}
        </h3>
        <p className="text-xs text-green-500">{subtitleSecondary}</p>
      </div>
    );
  }

  // For regular chart cards
  return (
    <div className={`card card-chart ${className}`}>
      {title && (
        <div className="card-chart-header">
          <h3 className="card-chart-title">{title}</h3>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="card-chart-body">{children}</div>
    </div>
  );
};

export default Card;
