import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({
  title = 'text',
  subtitle,
  subtitleSecondary,
  icon,
  variant = 'white',
  className = '',
  children,
  headerAction,
}) => {
  // Stat card style (pink, yellow, green, purple with icon)
  if (icon && ['pink', 'yellow', 'green', 'purple'].includes(variant)) {
    return (
      <div className={`card card-stat card-stat-${variant} ${className}`}>
        <div className={`card-icon card-icon-${variant}`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3 className={`card-title card-text-${variant}`}>{title}</h3>
        {subtitle && (
          <p className={`card-subtitle card-text-${variant}`}>{subtitle}</p>
        )}
        {subtitleSecondary && (
          <p className={`card-subtitle card-text-${variant}`}>
            {subtitleSecondary}
          </p>
        )}
      </div>
    );
  }

  // Chart/content card style (white with header)
  return (
    <div className={`card card-chart ${className}`}>
      <div className="card-chart-header">
        <div>
          <h3 className="card-chart-title">{title}</h3>
          {subtitle && (
            <p className="card-subtitle text-gray-500">{subtitle}</p>
          )}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="card-chart-body">{children}</div>
    </div>
  );
};

export default Card;
