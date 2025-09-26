"use client";

import { useBoolean } from "@/hooks/useBoolean";
import useBreakpoints from "@/hooks/useBreakpoints";
import { ReactNode, createContext, useContext, useEffect } from "react";

interface ISidebar {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const SidebarContext = createContext<ISidebar | null>(null);

interface ISidebarProps {
  children: ReactNode;
}

export default function SidebarProvider({ children }: ISidebarProps) {
  const { isMd } = useBreakpoints();
  const { value, toggle, setTrue, setFalse, setValue } = useBoolean(isMd);

  useEffect(() => {
    setValue(isMd);
  }, [isMd, setValue]);

  return (
    <SidebarContext.Provider value={{ isOpen: value, toggle, close: setFalse, open: setTrue }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar should be used inside of SidebarProvider");
  }

  return context;
}
