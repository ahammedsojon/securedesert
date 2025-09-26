"use client";

import { useSidebar } from "@/providers/sidebar";
import { Divider } from "primereact/divider";
import Items, { IItems } from "./Items";

export interface IGroup extends IItems {
  label?: string;
}

interface IGroupProps extends IGroup {}

export default function Group({ label = "", items }: IGroupProps) {
  const { isOpen } = useSidebar();

  return (
    <div>
      <Divider align="left">
        {label && isOpen && (
          <span className="font-hHackout text-sm text-foreground-alt">{label}</span>
        )}
      </Divider>
      <Items items={items} />
    </div>
  );
}
