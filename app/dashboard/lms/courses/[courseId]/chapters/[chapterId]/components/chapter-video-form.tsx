"use client";

import * as z from "zod";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { chapter as Chapter, muxdata as MuxData } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import MuxPlayer from "@mux/mux-player-react";
import { Button } from "@/components/ui/button";

interface Props {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

interface CloudinaryResult {
  url: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export function ChapterVideoForm({ initialData, courseId, chapterId }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch(`/api/lms/courses/${courseId}/chapters/${chapterId}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      // await axios.patch(`/api/lms/courses/${courseId}`, values);
      toast.success("Video updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="mr-2 size-4" />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-2 size-4" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEditing && (
        <div>
          {/* <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ thumbnail: url });
              }
            }}
          /> */}

          <CldUploadWidget
            uploadPreset="oynolje9"
            options={{
              // sources: [
              //   "local",
              //   "url",
              //   "image_search",
              //   "dropbox",
              //   "google_drive",
              //   "unsplash",
              //   "shutterstock",
              // ],
              multiple: false,
              maxFiles: 1,
            }}
            onUpload={(result) => {
              console.log(result);
              const data = result.info as CloudinaryResult;
              onSubmit({ videoUrl: data.url });
            }}
          >
            {({ open }) => <Button onClick={() => open()}>Upload</Button>}
          </CldUploadWidget>

          <div className="text-xs mt-4 text-muted-foreground">Upload chapter&apos;s video</div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs mt-2 text-muted-foreground">
          Videos can take a few minutes to process. Refresh teh page if video does not appear.
        </div>
      )}
    </div>
  );
}
