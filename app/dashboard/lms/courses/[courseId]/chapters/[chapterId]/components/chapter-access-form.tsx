"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Lock, Pencil, Unlock } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { chapter as Chapter } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const schema = z.object({
  isFree: z.boolean().default(false),
});

function ChapterAccessForm({ initialData, courseId, chapterId }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isFree: Boolean(initialData.isFree),
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await fetch(`/api/lms/courses/${courseId}/chapters/${chapterId}`, {
        method: "PATCH",
        body: JSON.stringify(values),
      });
      toast.success("Access updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter access
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="2-4 mr-2 h-4" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className={cn("mt-2 text-sm", !initialData.isFree && "italic text-slate-500")}>
          {initialData.isFree ? (
            <div className="flex items-center gap-x-2">
              <Unlock />
              This chapter is <span className="text-red-500">free</span> for preview
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <Lock />
              This chapter is <span className="text-green-500">not free</span>
            </div>
          )}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if you want to make this chapter{" "}
                      <b className="text-black">free</b> for preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

export default ChapterAccessForm;
