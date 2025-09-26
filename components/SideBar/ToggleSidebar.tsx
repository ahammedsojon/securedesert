"use client";

import { useSidebar } from "@/providers/sidebar";
import { Button } from "primereact/button";
import PanelLeftOpen from "@/icons/PanelLeftOpen";
import PanelLeftClose from "@/icons/PanelLeftClose";

export default function ToggleSidbar() {
  const { isOpen, toggle } = useSidebar();

  return (
    <Button
      text
      onClick={toggle}
      size="small"
      icon={isOpen ? PanelLeftClose : PanelLeftOpen}
      aria-label="Toggle Sidebar"
      tooltip={`${isOpen ? "Close" : "Open"} Sidebar`}
      tooltipOptions={{ position: "right" }}
    />
  );
}
