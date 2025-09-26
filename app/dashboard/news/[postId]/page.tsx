import { notFound, redirect } from "next/navigation";
import { writeups as Writeups } from "@prisma/client";

import { Editor } from "@/components/editor";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

async function getPostForUser(postId: Writeups["id"]) {
  const news = await prisma.news.findFirst({
    where: {
      id: postId,
    },
  });
  return news;
}

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getServerSession(authOptions);

  if (!user) {
    redirect("/api/auth/signin");
  }

  const post = await getPostForUser(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
      url={`/api/news/${post.id}`}
    />
  );
}
