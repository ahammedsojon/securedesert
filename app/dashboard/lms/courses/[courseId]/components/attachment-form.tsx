"use client";

import * as z from "zod";
import axios from "axios";
import { PlusCircle, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { attachment as Attachment, course as Course } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

interface CloudinaryResult {
  url: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export function AttachmentForm({ initialData, courseId }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/lms/courses/${courseId}/attachments`, values);
      toast.success("Attachment created");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/lms/courses/${courseId}/attachments/${id}`);
      toast.success("attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course attachment
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="mr-2 size-4" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="mt-2 text-sm italic text-slate-500">No attachments yet</p>
          )}

          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="roundedmd flex w-full items-center border border-sky-200 bg-sky-100 p-2 text-sky-700"
                >
                  <File className="mr-2 size-4 shrink-0" />
                  <Link
                    target="_blank"
                    href={attachment.url}
                    className="line-clamp-1 text-sm hover:underline"
                  >
                    {attachment.name}
                  </Link>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="size-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <button
                      type="button"
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto transition hover:opacity-75"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
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
            uploadPreset="z4ic5nzs"
            options={
              {
                // sources: [
                //   "local",
                //   "url",
                //   "image_search",
                //   "dropbox",
                //   "google_drive",
                //   "unsplash",
                //   "shutterstock",
                // ],
              }
            }
            onUpload={(result) => {
              console.log(result);
              const data = result.info as CloudinaryResult;
              onSubmit({ url: data.url });
            }}
          >
            {({ open }) => <Button onClick={() => open()}>Upload</Button>}
          </CldUploadWidget>

          <div className="text-xs mt-4 text-muted-foreground">
            Add anything your student might need.
          </div>
        </div>
      )}
    </div>
  );
}
