import { ProgressSpinner } from "primereact/progressspinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ProgressSpinner strokeWidth="3" />
    </div>
  );
}
