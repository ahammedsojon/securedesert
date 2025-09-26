import { category as Category, course as Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import prisma from "@/prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  Chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        published: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapter: {
          where: {
            published: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        const progressPercentage =
          course.purchase.length === 0 ? null : await getProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentage,
          Chapters: course.chapter, // rename 'chapter' to 'Chapters'
        };
      }),
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
