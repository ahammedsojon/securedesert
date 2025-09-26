"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSidebar } from "@/providers/sidebar";
import { Tooltip } from "primereact/tooltip";
import { useId } from "react";
import { usePathname } from "next/navigation";

export interface IItem {
  label: string;
  icon: string;
  to: string;
}

interface IItemProps extends IItem {}

export default function Item({ label, icon, to }: IItemProps) {
  const { isOpen } = useSidebar();
  const id = useId().replaceAll(":", "");
  const pathname = usePathname();

  return (
    <>
      <li id={id}>
        <Link
          href={to}
          className={cn(
            "flex items-center gap-4 whitespace-nowrap rounded py-3 text-foreground-alt no-underline transition-colors hover:bg-primary/10 hover:text-primary",
            { "px-5": isOpen },
            { "justify-center px-3": !isOpen },
            { "text-primary": pathname === to },
          )}
        >
          <i className={icon} style={{ fontSize: "1rem" }} />
          {isOpen && <span className="text-sm">{label}</span>}
        </Link>
      </li>
      {isOpen || <Tooltip target={`#${id}`} content={label} />}
    </>
  );
}
