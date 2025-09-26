import SideBar from "@/components/SideBar";
import AuthProvider from "@/providers/auth";
import { ReactNode } from "react";

const menuGroups = [
  {
    label: "Learn",
    items: [
      {
        label: "Home",
        icon: "pi pi-home",
        to: "/home",
      },
      {
        label: "Desert Battles",
        icon: "pi pi-shield",
        to: "/home/battles",
      },
      {
        label: "Challenges",
        icon: "pi pi-box",
        to: "/home/challenges",
      },
      {
        label: "Courses",
        icon: "pi pi-desktop",
        to: "/home/courses",
      },
    ],
  },
  {
    label: "Explore",
    items: [
      {
        label: "Blog",
        icon: "pi pi-book",
        to: "/home/blog",
      },
      {
        label: "Brain Does",
        icon: "pi pi-paperclip",
        to: "/home/braindoes",
      },
      {
        label: "News",
        icon: "pi pi-bolt",
        to: "/home/news",
      },
      {
        label: "Teams",
        icon: "pi pi-users",
        to: "/home/teams",
      },
      {
        label: "Wanted",
        icon: "pi pi-id-card",
        to: "/home/wanted",
      },
      {
        label: "Events",
        icon: "pi pi-flag",
        to: "/home/events",
      },
    ],
  },
  {
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
        to: "/home/settings",
      },
      {
        label: "Profile",
        icon: "pi pi-user",
        to: "/home/profile",
      },
    ],
  },
];

export default function Home({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="relative flex">
        <SideBar groups={menuGroups} />
        <div className="min-h-screen w-full">{children}</div>
      </div>
    </AuthProvider>
  );
}
