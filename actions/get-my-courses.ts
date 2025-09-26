import { category as Category, chapter as Chapter, course as Course } from "@prisma/client";
import prisma from "@/prisma/client";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  Chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getMyCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    // Fetch purchased courses along with category and chapters
    const purchasedCourses = await prisma.purchase.findMany({
      where: { userId },
      select: {
        course: {
          include: {
            category: true,
            chapter: {
              where: { published: true },
            },
          },
        },
      },
    });

    // Map Prisma lowercase 'chapter' to 'Chapters' to match our type
    const courses: CourseWithProgressWithCategory[] = purchasedCourses.map((purchase) => {
      const {course} = purchase;
      return {
        ...course,
        Chapters: course.chapter, // map to uppercase property
        progress: null, // initialize progress
      };
    });

    // Calculate progress for each course
    for (const course of courses) {
      course.progress = await getProgress(userId, course.id);
    }

    // Split courses into completed and in-progress
    const completedCourses = courses.filter((c) => c.progress === 100);
    const coursesInProgress = courses.filter((c) => (c.progress ?? 0) < 100);

    return { completedCourses, coursesInProgress };
  } catch (error) {
    console.log("[GET_MY_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
