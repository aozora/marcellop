import { useContext, createContext, ReactNode, useReducer } from 'react';
import { MenuItem, Site } from '../../src/lib/types/index';

export type PageState = {
  site: Site;
  menu: {
    menuItems: Array<MenuItem>;
  };
};

type Action = { type: 'setInitialData'; data: PageState };
type Dispatch = (action: Action) => void;

const PageStateContext = createContext<PageState | undefined>(undefined);
const PageDispatchContext = createContext<Dispatch | undefined>(undefined);

function reducer(state: PageState, action: Action) {
  switch (action.type) {
    case 'setInitialData': {
      return {
        site: action.data.site,
        menu: action.data.menu
      } as PageState;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

type PageProviderProps = {
  children: ReactNode;
  initialState?: PageState;
};

/**
 * Custom context provider to share some common page data
 * @param children
 * @param initialState
 * @constructor
 */
function PageProvider({ children, initialState }: PageProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    initialState || {
      site: null,
      menu: null
    }
  );

  return (
    <PageDispatchContext.Provider value={dispatch}>
      <PageStateContext.Provider value={state}>{children}</PageStateContext.Provider>{' '}
    </PageDispatchContext.Provider>
  );
}

function usePageState(): PageState {
  const context = useContext(PageStateContext);

  if (context === undefined) {
    throw new Error('usePageState must be used within a AppProvider');
  }

  return context;
}

function usePageDispatch(): Dispatch {
  const context = useContext(PageDispatchContext);

  if (context === undefined) {
    throw new Error('usePageDispatch must be used within a AppProvider');
  }

  return context;
}

export { PageProvider, usePageState, usePageDispatch };
