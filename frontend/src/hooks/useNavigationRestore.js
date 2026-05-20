import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useNavigationStore from '../stores/navigationStore';

/**
 * Navigation Restoration Hook
 * Restores UI state, scroll position, and highlights selected items
 * 
 * @param {Object} options - Restoration options
 * @param {Function} options.onRestoreUIState - Callback to restore UI state
 * @param {Function} options.getItemRef - Function to get ref for item by ID
 * @param {number} options.scrollDelay - Delay before scrolling (ms)
 * @param {number} options.highlightDuration - Duration to highlight item (ms)
 * @returns {Object} Restoration utilities
 */
const useNavigationRestore = (options = {}) => {
  const {
    onRestoreUIState,
    getItemRef,
    scrollDelay = 100,
    highlightDuration = 2000,
  } = options;

  const location = useLocation();
  const getNavigationContext = useNavigationStore(state => state.getNavigationContext);
  const popNavigation = useNavigationStore(state => state.popNavigation);
  const hasRestoredRef = useRef(false);
  const highlightTimeoutRef = useRef(null);

  /**
   * Restore scroll position
   */
  const restoreScrollPosition = useCallback((scrollPosition) => {
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }, scrollDelay);
  }, [scrollDelay]);

  /**
   * Scroll to and highlight a specific item
   */
  const scrollToItem = useCallback((itemId) => {
    if (!getItemRef) return;

    setTimeout(() => {
      const itemRef = getItemRef(itemId);
      
      if (itemRef?.current) {
        // Scroll into view
        itemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        // Add highlight class
        itemRef.current.classList.add('navigation-highlight');

        // Remove highlight after duration
        if (highlightTimeoutRef.current) {
          clearTimeout(highlightTimeoutRef.current);
        }

        highlightTimeoutRef.current = setTimeout(() => {
          itemRef.current?.classList.remove('navigation-highlight');
        }, highlightDuration);
      }
    }, scrollDelay);
  }, [getItemRef, scrollDelay, highlightDuration]);

  /**
   * Main restoration effect
   */
  useEffect(() => {
    // Only restore once per mount
    if (hasRestoredRef.current) return;

    const shouldRestore = location.state?.restoreContext === true;
    
    if (shouldRestore) {
      const context = getNavigationContext(location.pathname);
      
      if (context) {
        // Restore UI state (filters, tabs, search)
        if (onRestoreUIState && context.uiState) {
          onRestoreUIState(context.uiState);
        }

        // Restore scroll position or scroll to item
        if (context.itemId && getItemRef) {
          scrollToItem(context.itemId);
        } else if (context.scrollPosition) {
          restoreScrollPosition(context.scrollPosition);
        }

        // Pop the navigation entry after restoration
        popNavigation();
        
        hasRestoredRef.current = true;
      }
    }

    // Cleanup
    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [
    location.pathname,
    location.state,
    getNavigationContext,
    popNavigation,
    onRestoreUIState,
    scrollToItem,
    restoreScrollPosition,
    getItemRef,
  ]);

  /**
   * Reset restoration flag (call when component unmounts or route changes)
   */
  const resetRestoration = useCallback(() => {
    hasRestoredRef.current = false;
  }, []);

  /**
   * Check if restoration is pending
   */
  const isRestorationPending = useCallback(() => {
    return location.state?.restoreContext === true && !hasRestoredRef.current;
  }, [location.state]);

  return {
    resetRestoration,
    isRestorationPending,
    shouldRestore: location.state?.restoreContext === true,
  };
};

export default useNavigationRestore;
