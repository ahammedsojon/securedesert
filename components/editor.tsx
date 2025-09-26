"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as z from "zod";

import "@/app/styles/editor.css";
import { cn } from "@/lib/utils";
// import { postPatchSchema } from "@/lib/validations/post"
import { buttonVariants } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { JsonValue } from "@prisma/client/runtime/library";
// import { toast } from "@/components/ui/use-toast"
// import { Icons } from "@/components/icons"

const postPatchSchema = z.object({
  title: z.string().max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
});

interface EditorProps {
  post: { id: string; title: string; content: JsonValue; published: boolean };
  url: string;
}

type FormData = z.infer<typeof postPatchSchema>;

export function Editor({ post, url }: EditorProps) {
  console.log(post);
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  // const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    // DON'T WORRY ABOUT IT. ITS WORKING, JUST INSTALL THEM
    // const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [post]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return function () {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
    return undefined;
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    // setIsSaving(true);

    const blocks = await ref.current?.save();
    console.log(blocks);
    const response = await fetch(`${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    });
    const json = response;
    console.log(json);
    // setIsSaving(false);

    if (!response?.ok) {
      toast.error("Something went wrong.");
      return console.log("Your post was not saved. Please try again.");
      // return toast({
      //   title: "Something went wrong.",
      //   description: "Your post was not saved. Please try again.",
      //   variant: "destructive",
      // })
    }

    router.refresh();
    toast.success("Your post has been saved.");
    return console.log("Your post has been saved.");
    // return toast({
    //   description: "Your post has been saved.",
    // })
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Toaster />
      <div className="editor-css grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/dashboard" className={cn(buttonVariants({ variant: "ghost" }))}>
              <>
                {/* <Icons.chevronLeft className="mr-2 h-4 w-4" /> */}
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">
              {post.published ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {/* {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone dark:prose-invert mx-auto w-[800px]">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="text-5xl w-full resize-none appearance-none overflow-hidden bg-transparent font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use <kbd className="text-xs rounded-md border bg-muted px-1 uppercase">Tab</kbd> to open
            the command menu.
          </p>
        </div>
      </div>
    </form>
  );
}
