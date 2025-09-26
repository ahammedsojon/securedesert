"use client";

import { useSidebar } from "@/providers/sidebar";

export default function Logo() {
  const { isOpen } = useSidebar();
  const size = 24;

  return (
    <div className="mb-4 flex items-center justify-center gap-2 p-2">
      <img
        width={size}
        height={size}
        src="/logo.svg"
        alt="Secure Desert Logo"
        style={{
          width: size,
          height: size,
        }}
      />
      {isOpen && <h1 className="mt-1 whitespace-nowrap text-sm">Secure Desert</h1>}
    </div>
  );
}
