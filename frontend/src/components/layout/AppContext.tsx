"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface Crumb {
  label: string;
  href?: string;
}

interface AppContextValue {
  crumbs: Crumb[];
  setCrumbs: (next: Crumb[]) => void;
  headerAction: ReactNode | null;
  setHeaderAction: (next: ReactNode | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (next: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [crumbs, setCrumbsState] = useState<Crumb[]>([]);
  const [headerAction, setHeaderActionState] = useState<ReactNode | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const setCrumbs = useCallback((next: Crumb[]) => setCrumbsState(next), []);
  const setHeaderAction = useCallback(
    (next: ReactNode | null) => setHeaderActionState(next),
    [],
  );

  const value = useMemo<AppContextValue>(
    () => ({ crumbs, setCrumbs, headerAction, setHeaderAction, sidebarOpen, setSidebarOpen }),
    [crumbs, setCrumbs, headerAction, setHeaderAction, sidebarOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppContextProvider");
  return ctx;
}

export function usePageBreadcrumbs(crumbs: Crumb[]): void {
  const { setCrumbs } = useAppContext();
  const key = JSON.stringify(crumbs);
  useEffect(() => {
    setCrumbs(crumbs);
    return () => setCrumbs([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

export function useHeaderAction(action: ReactNode | null): void {
  const { setHeaderAction } = useAppContext();
  useEffect(() => {
    setHeaderAction(action);
    return () => setHeaderAction(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);
}
