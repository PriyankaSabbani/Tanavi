import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useRef } from 'react';
import useNavigationStore from '../stores/navigationStore';

/**
 * Smart Navigation Hook
 * Provides context-aware navigation with full state preservation
 * 
 * @returns {Object} Navigation utilities
 */
const useSmartNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const saveNavigationContext = useNavigationStore(state => state.saveNavigationContext);
  const getLastNavigation = useNavigationStore(state => state.getLastNavigation);
  
  // Store current UI state reference
  const currentUIStateRef = useRef({});

  /**
   * Navigate to a route with full context preservation
   * 
   * @param {string} to - Destination route
   * @param {Object} options - Navigation options
   * @param {string} options.itemId - ID of clicked item
   * @param {Object} options.uiState - Current UI state (filters, tabs, search)
   * @param {Object} options.metadata - Additional metadata
   * @param {boolean} options.replace - Replace current history entry
   */
  const navigateWithContext = useCallback((to, options = {}) => {
    const {
      itemId,
      uiState = currentUIStateRef.current,
      metadata = {},
      replace = false,
    } = options;

    // Save navigation context
    const contextId = saveNavigationContext({
      fromRoute: location.pathname,
      toRoute: to,
      itemId,
      scrollPosition: window.scrollY,
      uiState,
      metadata,
    });

    // Navigate with state
    navigate(to, {
      replace,
      state: {
        navigationContextId: contextId,
        fromRoute: location.pathname,
        itemId,
        canGoBack: true,
      },
    });
  }, [location.pathname, navigate, saveNavigationContext]);

  /**
   * Navigate back with context restoration
   * Falls back to browser back if no context exists
   */
  const navigateBack = useCallback(() => {
    const lastNav = getLastNavigation();
    
    if (lastNav && lastNav.fromRoute) {
      // Navigate back to source route with restoration flag
      navigate(lastNav.fromRoute, {
        state: {
          restoreContext: true,
          navigationContextId: lastNav.id,
        },
      });
    } else {
      // Fallback to browser back
      navigate(-1);
    }
  }, [navigate, getLastNavigation]);

  /**
   * Update current UI state (filters, search, tabs)
   * Call this whenever UI state changes
   * 
   * @param {Object} uiState - UI state to store
   */
  const updateUIState = useCallback((uiState) => {
    currentUIStateRef.current = { ...currentUIStateRef.current, ...uiState };
  }, []);

  /**
   * Get current UI state
   * 
   * @returns {Object} Current UI state
   */
  const getUIState = useCallback(() => {
    return currentUIStateRef.current;
  }, []);

  /**
   * Check if current page was navigated to with context
   * 
   * @returns {boolean} True if has navigation context
   */
  const hasNavigationContext = useCallback(() => {
    return location.state?.canGoBack === true;
  }, [location.state]);

  return {
    navigateWithContext,
    navigateBack,
    updateUIState,
    getUIState,
    hasNavigationContext,
    currentRoute: location.pathname,
  };
};

export default useSmartNavigation;
