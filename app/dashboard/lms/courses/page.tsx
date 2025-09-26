import React from "react";
import prisma from "@/prisma/client";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

function LmsCoursesPage() {
  const session = await getServerSession(authOptions);
  // only admin can post
  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }

  // fetch user's coruses
  // const userCourses = await prisma.course.findMany({
  //   where: { userId: session.user.id },
  // orderBy: {
  //   createAt: "desc"
  // }
  // })

  // all courses
  const courses = await prisma.course.findMany({
    orderBy: {
      createAt: "desc",
    },
  });

  console.log({ courses });

  return (
    <div className="p-6">
      News
      {/* <Link href={"/dashboard/lms/courses/create"}>
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={courses} />
    </div>
  );
}

export default LmsCoursesPage;
