/**
 * Navigation Helper Utilities
 */

/**
 * Debounce function for scroll events
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Get scroll position
 */
export const getScrollPosition = () => {
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset,
  };
};

/**
 * Set scroll position
 */
export const setScrollPosition = (x, y, behavior = 'smooth') => {
  window.scrollTo({
    top: y,
    left: x,
    behavior,
  });
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Scroll element into view with offset
 */
export const scrollToElementWithOffset = (element, offset = 0, behavior = 'smooth') => {
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
};

/**
 * Generate unique navigation ID
 */
export const generateNavigationId = () => {
  return `nav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Serialize UI state for storage
 */
export const serializeUIState = (state) => {
  try {
    return JSON.stringify(state);
  } catch (error) {
    console.error('Failed to serialize UI state:', error);
    return '{}';
  }
};

/**
 * Deserialize UI state from storage
 */
export const deserializeUIState = (stateString) => {
  try {
    return JSON.parse(stateString);
  } catch (error) {
    console.error('Failed to deserialize UI state:', error);
    return {};
  }
};

/**
 * Deep merge objects
 */
export const deepMerge = (target, source) => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  
  return output;
};

/**
 * Check if value is object
 */
const isObject = (item) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Extract query params from URL
 */
export const extractQueryParams = (search) => {
  const params = new URLSearchParams(search);
  const result = {};
  
  for (const [key, value] of params) {
    result[key] = value;
  }
  
  return result;
};

/**
 * Build query string from object
 */
export const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, value);
    }
  });
  
  return searchParams.toString();
};
