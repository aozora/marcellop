import { useContext, createContext } from "react";
import type { ReactNode } from "react";
import type { Menu, Site } from "~/types";

export type PageState = {
  site: Site | null;
  menu: Menu | null;
};

const PageStateContext = createContext<PageState | undefined>(undefined);

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
function PageProvider({
  children,
  initialState,
}: PageProviderProps): React.JSX.Element {
  return (
    <PageStateContext.Provider value={initialState}>
      {children}
    </PageStateContext.Provider>
  );
}

function usePageState(): PageState {
  const context = useContext(PageStateContext);

  if (context === undefined) {
    throw new Error("usePageState must be used within a PageProvider");
  }

  return context;
}

export { PageProvider, usePageState };
