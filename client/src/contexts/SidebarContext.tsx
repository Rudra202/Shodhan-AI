import { createContext, useContext, useState, type ReactNode } from 'react';
import { sidebarLinks } from '../config/sidebarLinks';

interface SidebarContextType {
  visibleLinks: Record<string, boolean>;
  toggleLink: (to: string) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [visibleLinks, setVisibleLinks] = useState<Record<string, boolean>>(
    Object.fromEntries(sidebarLinks.map((l) => [l.to, true]))
  );

  const toggleLink = (to: string) => {
    setVisibleLinks((prev) => ({ ...prev, [to]: !prev[to] }));
  };

  return (
    <SidebarContext.Provider value={{ visibleLinks, toggleLink }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
