"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

interface Props {
  button: {
    btnText: string;
    postAPI: string;
    redirect: string;
  };
}

export function PostCreateButton({ button }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onClick() {
    setIsLoading(true);

    const response = await fetch(button.postAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });
    const post = await response.json();
    console.log("Response: ", post);
    setIsLoading(false);

    if (!response?.ok) {
      return toast.error("Something went wrong.");
    }

    // This forces a cache invalidation.
    router.refresh();
    return router.push(`${button.redirect}/${post.id}`);
  }

  return (
    <button type="button" onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <span className="mr-2 size-4 animate-spin" />
      ) : (
        <span className="mr-2 size-4" />
      )}
      {button.btnText}
    </button>
  );
}
