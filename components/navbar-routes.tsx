"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProfileButton } from "./profile-button";
import { SearchInput } from "./search-input";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export function NavbarRoutes() {
  // const session = await getServerSession(authOptions);

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/dashbaord");
  const isCoursePage = pathname?.includes("/home/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex gap-x-2">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 size-4" />
              Exit
            </Button>
          </Link>
        ) : null}
        {/* <Button>
            {session?.user.name}
        </Button> */}
        <ProfileButton />
      </div>
    </>
  );
}
