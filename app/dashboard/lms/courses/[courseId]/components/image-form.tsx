"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { course as Course } from "@prisma/client";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

interface CloudinaryResult {
  url: string;
}

const formSchema = z.object({
  thumbnail: z.string().min(1, {
    message: "Image is required",
  }),
});

export function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch(`/api/lms/courses/${courseId}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      // await axios.patch(`/api/lms/courses/${courseId}`, values);
      toast.success("Thumbnail updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.thumbnail && (
            <>
              <PlusCircle className="mr-2 size-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData.thumbnail && (
            <>
              <Pencil className="mr-2 size-4" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.thumbnail ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="size-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData.thumbnail}
            />
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
            uploadPreset="lh1xuugo"
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
              onSubmit({ thumbnail: data.url });
            }}
          >
            {({ open }) => <Button onClick={() => open()}>Upload</Button>}
          </CldUploadWidget>

          <div className="text-xs mt-4 text-muted-foreground">16:9 aspect ratio recommended</div>
        </div>
      )}
    </div>
  );
}
