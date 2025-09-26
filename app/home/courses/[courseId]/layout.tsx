import { redirect } from "next/navigation";
import React from "react";
import { getProgress } from "@/actions/get-progress";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { CourseSidebar } from "./components/course-sidebar";
import { CourseNavbar } from "./components/course-navbar";

function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const session = await getServerSession(authOptions);

  // Only admin can access
  if (session?.user.role !== "ADMIN") {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Fetch course with chapters and user progress
  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapter: {
        where: { published: true },
        include: {
          userprogress: {
            where: { userId: session.user.id },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  // Map course to expected types
  const courseData = {
    ...course,
    Chapters: course.chapter.map((ch) => ({
      ...ch,
      userProgress: ch.userprogress || [], // map lowercase userprogress to userProgress
    })),
  };

  // Get user progress count
  const progressCount = await getProgress(session.user.id, course.id);

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-80">
        <CourseNavbar course={courseData} progressCount={progressCount} />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <CourseSidebar course={courseData} progressCount={progressCount} />
      </div>
      <main className="h-full pt-[80px] md:pl-80">{children}</main>
    </div>
  );
}

export default CourseLayout;
