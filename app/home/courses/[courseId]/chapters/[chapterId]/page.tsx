import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { Preview } from "@/components/preview";
import { LmsBanner } from "@/components/lmsBanner";
import { VideoPlayer } from "./components/video-player";
import { CourseEnrollButton } from "./components/course-enroll-button";
import { CourseProgressButton } from "./components/course-progress-button";

async function ChapterIdPage({ params }: { params: { courseId: string; chapterId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  const { chapter, course, muxData, attachments, nextChapter, userProgress, purchase } =
    await getChapter({
      userId: session.user.id,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <LmsBanner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <LmsBanner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="mx-auto flex w-full max-w-4xl flex-col pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={params.courseId} price={course.price!} />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <Link
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex w-full items-center rounded-md border bg-sky-200 p-3 text-sky-700 hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterIdPage;
