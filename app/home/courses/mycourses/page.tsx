import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getMyCourses } from "@/actions/get-my-courses";
import { CoursesList } from "@/components/courses-list";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { InfoCard } from "./components/info-card";

export default async function MyCourses() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getMyCourses(session!.user.id);

  return (
    <div className="space-y-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={coursesInProgress.length} />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
