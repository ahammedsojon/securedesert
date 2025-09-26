import { authOptions } from "@/lib/authOptions";
import { IconBadge } from "@/components/icon-badge";
import prisma from "@/prisma/client";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { LmsBanner } from "@/components/lmsBanner";
import ChapterTitleForm from "./components/chapter-title-form";
import ChapterDescriptionForm from "./components/chapter-description-form";
import ChapterAccessForm from "./components/chapter-access-form";
import { ChapterVideoForm } from "./components/chapter-video-form";
import { ChapterActions } from "./components/chapter-actions";

interface Props {
  params: { courseId: string; chapterId: string };
}

async function ChapterPage({ params: { courseId, chapterId } }: Props) {
  const session = await getServerSession(authOptions);
  // only admin can post
  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }

  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId, courseId },
    include: {
      muxdata: true,
    },
  });
  if (!chapter) return redirect(`/dashboard/lms/courses/${courseId}`);

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.published && (
        <LmsBanner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/lms/courses/${courseId}`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to course setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">{chapter.title}</h1>
                <span className="text-sm text-slate-700">
                  Complete all required fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.published}
              />
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter</h2>
            </div>
            <ChapterTitleForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl"> Access Settings</h2>
              </div>
              <ChapterAccessForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl"> Add a video</h2>
            </div>
            <ChapterVideoForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChapterPage;
