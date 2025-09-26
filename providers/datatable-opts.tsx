"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

export type sizeType = "small" | "normal" | "large";

interface IDataTableOpts {
  size: sizeType;
}

interface IDataTableOptsContext extends IDataTableOpts {
  setSize: (_: sizeType) => void; // eslint-disable-line no-unused-vars
  setOpts: Dispatch<SetStateAction<IDataTableOpts>>;
}

const DataTableOptsContext = createContext<IDataTableOptsContext | null>(null);

interface IDataTableOptsProps {
  children: ReactNode;
}

const INITIAL_OPTS: IDataTableOpts = {
  size: "small",
};

export default function DataTableOptsProvider({ children }: IDataTableOptsProps) {
  const [opts, setOpts] = useState<IDataTableOpts>(INITIAL_OPTS);

  const setSize = (size: sizeType) => {
    setOpts({ ...opts, size });
  };

  return (
    <DataTableOptsContext.Provider value={{ ...opts, setSize, setOpts }}>
      {children}
    </DataTableOptsContext.Provider>
  );
}

export function useDataTableOpts() {
  const context = useContext(DataTableOptsContext);

  if (!context) {
    throw new Error("useDataTableOpts should be used inside of DataTableOptsProvider");
  }

  return context;
}
