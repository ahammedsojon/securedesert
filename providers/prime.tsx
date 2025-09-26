import "@/app/styles/material.css";
import "@/app/styles/theme.css";
import "primeicons/primeicons.css";

import { PrimeReactPTOptions, PrimeReactProvider } from "primereact/api";
import { ReactNode } from "react";

interface PrimeProviderProps extends PrimeReactPTOptions {
  children: ReactNode;
}

export default function PrimeProvider({ children }: PrimeProviderProps) {
  return (
    <PrimeReactProvider
      value={{
        unstyled: false,
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
