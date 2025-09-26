import React from "react";
import prisma from "@/prisma/client";
import { SearchInput } from "@/components/search-input";
import { getServerSession } from "next-auth";
import { getCourses } from "@/actions/get-courses";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { authOptions } from "@/lib/authOptions";
import Categories from "./components/categories";

interface Props {
  searchParams: {
    title: string;
    category_id: string;
  };
}

async function CoursesPage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const courses = await getCourses({
    userId: session.user.id,
    ...searchParams,
  });
  return (
    <>
      <div className="block px-6 pt-6 md:mb-0">
        <SearchInput />
      </div>
      <div className="space-y-4 p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}

export default CoursesPage;
