import SidebarProvider from "@/providers/sidebar";
import ToggleSidbar from "./ToggleSidebar";
import Groups, { IGroups } from "./Groups";
import Logo from "./Logo";

interface ISideBar extends IGroups {}

interface ISideBarProps extends ISideBar {}

export default function SideBar({ groups }: ISideBarProps) {
  return (
    <SidebarProvider>
      <div className="relative border-r border-primary bg-popover p-2">
        <div className="sticky top-4 flex flex-col items-end">
          <Logo />
          <ToggleSidbar />
          <Groups groups={groups} />
        </div>
      </div>
    </SidebarProvider>
  );
}
