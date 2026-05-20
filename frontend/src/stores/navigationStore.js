import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Navigation Store - Manages navigation context and UI state
 * Persists to sessionStorage to survive page refreshes
 */
const useNavigationStore = create(
  persist(
    (set, get) => ({
      // Navigation history stack
      navigationStack: [],
      
      // Current page state
      currentPageState: null,

      /**
       * Save navigation context before navigating away
       */
      saveNavigationContext: (context) => {
        const { navigationStack } = get();
        
        const navigationEntry = {
          id: `nav_${Date.now()}_${Math.random()}`,
          timestamp: Date.now(),
          fromRoute: context.fromRoute,
          toRoute: context.toRoute,
          itemId: context.itemId,
          scrollPosition: context.scrollPosition || window.scrollY,
          uiState: context.uiState || {},
          metadata: context.metadata || {},
        };

        const updatedStack = [...navigationStack, navigationEntry].slice(-20);
        
        set({ 
          navigationStack: updatedStack,
          currentPageState: navigationEntry 
        });

        return navigationEntry.id;
      },

      /**
       * Get navigation context for a specific route
       */
      getNavigationContext: (route) => {
        const { navigationStack } = get();
        
        for (let i = navigationStack.length - 1; i >= 0; i--) {
          if (navigationStack[i].fromRoute === route) {
            return navigationStack[i];
          }
        }
        
        return null;
      },

      /**
       * Get the last navigation entry
       */
      getLastNavigation: () => {
        const { navigationStack } = get();
        return navigationStack.length > 0 
          ? navigationStack[navigationStack.length - 1] 
          : null;
      },

      /**
       * Pop the last navigation entry
       */
      popNavigation: () => {
        const { navigationStack } = get();
        if (navigationStack.length === 0) return null;

        const lastEntry = navigationStack[navigationStack.length - 1];
        const updatedStack = navigationStack.slice(0, -1);
        
        set({ navigationStack: updatedStack });
        return lastEntry;
      },

      /**
       * Clear navigation for a specific route
       */
      clearNavigationForRoute: (route) => {
        const { navigationStack } = get();
        const updatedStack = navigationStack.filter(
          entry => entry.fromRoute !== route && entry.toRoute !== route
        );
        set({ navigationStack: updatedStack });
      },

      /**
       * Clear all navigation history
       */
      clearAllNavigation: () => {
        set({ navigationStack: [], currentPageState: null });
      },

      /**
       * Update UI state for current page
       */
      updateCurrentUIState: (uiState) => {
        const { currentPageState } = get();
        if (currentPageState) {
          set({
            currentPageState: {
              ...currentPageState,
              uiState: { ...currentPageState.uiState, ...uiState }
            }
          });
        }
      },

      /**
       * Check if navigation context exists for a route
       */
      hasNavigationContext: (route) => {
        return get().getNavigationContext(route) !== null;
      },
    }),
    {
      name: 'navigation-storage',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);

export default useNavigationStore;
