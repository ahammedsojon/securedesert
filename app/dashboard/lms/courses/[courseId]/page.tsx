import { authOptions } from "@/lib/authOptions";
import { IconBadge } from "@/components/icon-badge";
import prisma from "@/prisma/client";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { LmsBanner } from "@/components/lmsBanner";
import TitleForm from "./components/title-form";
import DescriptionForm from "./components/description-form";
import { CategoryForm } from "./components/category-form";
import { ImageForm } from "./components/image-form";
import PriceForm from "./components/price-form ";
import { AttachmentForm } from "./components/attachment-form";
import ChaptersForm from "./components/chapters-form";
import { Action } from "./components/actions";

interface Props {
  params: { courseId: string };
}

async function AdminCoursePage({ params: { courseId } }: Props) {
  // check if its an admin
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return redirect("/");

  // get course
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapter: { orderBy: { position: "asc" } },
      attachment: { orderBy: { createAt: "desc" } }, // match your schema field
    },
  });

  if (!course) return redirect("/");

  // rename for component props
  const courseData = {
    ...course,
    attachments: course.attachment || [],
    Chapters: course.chapter || [],
  };

  // get all categories
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.price,
    course.thumbnail,
    course.chapter.some((chapter) => chapter.published),
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.published && (
        <LmsBanner
          variant="warning"
          label="This course is unpublished. It will not be visible to the users"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700"> Complete all fields {completionText}</span>
          </div>
          <Action disabled={!isComplete} courseId={courseId} isPublished={course.published} />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize the course</h2>
            </div>
            <TitleForm initialData={courseData} courseId={courseId} />
            <DescriptionForm initialData={courseData} courseId={courseId} />
            <ImageForm initialData={courseData} courseId={courseId} />
            <CategoryForm
              initialData={courseData}
              courseId={courseId}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Chapters</h2>
              </div>
              <ChaptersForm initialData={courseData} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={courseData} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={courseData} courseId={courseId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCoursePage;
