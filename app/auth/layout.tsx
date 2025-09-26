import { ReactNode } from "react";

export default function Auth({ children }: { children: ReactNode }) {
  return <div className="container my-12 flex w-full max-w-xl flex-col gap-12">{children}</div>;
}
