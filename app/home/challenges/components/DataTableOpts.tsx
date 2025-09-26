"use client";

import { SelectButton } from "primereact/selectbutton";
import { LayoutList, StretchHorizontal } from "lucide-react";
import { useDataTableOpts } from "@/providers/datatable-opts";
import SizeTemplate, { ISizeOpts } from "./SizeTemplate";

export default function DataTableOpts() {
  const { size, setSize } = useDataTableOpts();

  const sizeOpts: ISizeOpts[] = [
    { Icon: LayoutList, value: "small" },
    { Icon: StretchHorizontal, value: "normal" },
  ];

  return (
    <div className="flex justify-end gap-4 bg-card px-4 py-2">
      <SelectButton
        value={size}
        options={sizeOpts}
        onChange={(e) => e.value && setSize(e.value)}
        itemTemplate={SizeTemplate}
      />
    </div>
  );
}
