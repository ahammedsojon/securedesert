"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confietti-store";

interface Props {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export function Action({ disabled, courseId, isPublished }: Props) {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await fetch(`/api/lms/courses/${courseId}/unpublish`, {
          method: "PATCH",
        });
        toast.success("Course unpublished");
      } else {
        await fetch(`/api/lms/courses/${courseId}/publish`, {
          method: "PATCH",
        });
        toast.success("Course published");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await fetch(`/api/lms/courses/${courseId}`, {
        method: "DELETE",
      });

      toast.success("Course deleted");
      router.refresh();
      router.push("/dashboard/lms/courses");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onClick} disabled={disabled || isLoading} variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="size-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
}
