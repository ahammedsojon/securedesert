"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { chapter as Chapter, course as Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChaptersList from "./chapters-list";

interface Props {
  initialData: Course & { Chapters: Chapter[] };
  courseId: string;
}

const schema = z.object({
  title: z.string().min(1),
});

function ChaptersForm({ initialData, courseId }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await fetch(`/api/lms/courses/${courseId}/chapters`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      toast.success("Chapter Created");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await fetch(`/api/lms/courses/${courseId}/chapters/reorder`, {
        method: "PUT",
        body: JSON.stringify({ list: updateData }),
      });
      // await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
      //   list: updateData
      // });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/dashboard/lms/courses/${courseId}/chapters/${id}`);
  };
  return (
    <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
      {isUpdating && (
        <div className="absolute right-0 top-0 flex size-full items-center justify-center rounded-md bg-slate-500/20">
          <Loader2 className="size-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Course Chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="2-4 mr-2 h-4" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Course Introduction'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn("mt-2 text-sm", !initialData.Chapters.length && "italic text-slate-500")}
        >
          {!initialData.Chapters.length && "No chapters"}
          <ChaptersList onEdit={onEdit} onReorder={onReorder} items={initialData.Chapters || []} />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs mt-4 text-muted-foreground">Drag and drop to reorder the chapters</p>
      )}
    </div>
  );
}

export default ChaptersForm;
