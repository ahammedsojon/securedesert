"use client";

import { useSidebar } from "@/providers/sidebar";
import clsx from "clsx";
import Group, { IGroup } from "./Group";

export interface IGroups {
  groups: IGroup[];
}

interface IGroupsProps extends IGroups {}

export default function Groups({ groups }: IGroupsProps) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={clsx("flex flex-col", {
        "gap-4": isOpen,
      })}
    >
      {groups?.map((group, idx) => <Group key={idx} {...group} />)}
    </div>
  );
}
