import React from 'react';
import { Link } from 'react-router-dom';
import useSmartNavigation from '../hooks/useSmartNavigation';

/**
 * SmartLink Component
 * Enhanced Link component with automatic context preservation
 * 
 * @param {Object} props - Component props
 * @param {string} props.to - Destination route
 * @param {string} props.itemId - ID of the item being clicked
 * @param {Object} props.uiState - Current UI state to preserve
 * @param {Object} props.metadata - Additional metadata
 * @param {boolean} props.replace - Replace history entry
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - CSS classes
 * @param {Function} props.onClick - Additional click handler
 */
const SmartLink = ({
  to,
  itemId,
  uiState,
  metadata,
  replace = false,
  children,
  className,
  onClick,
  ...rest
}) => {
  const { navigateWithContext } = useSmartNavigation();

  const handleClick = (e) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Navigate with context
    navigateWithContext(to, {
      itemId,
      uiState,
      metadata,
      replace,
    });
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default SmartLink;
