import { Card } from "primereact/card";
import Link from "next/link";
import Categories from "./Categories";
import { ICategory } from "./Category";
import ProfileDate, { IProfileDate } from "./ProfileDate";

export interface IBlog extends IProfileDate {
  id: string;
  thumbnail: string;
  categories: ICategory[];
  title: string;
  summary: string;
}

export default function Blog({
  id,
  thumbnail,
  categories,
  title,
  summary,
  createdAt,
  profile,
  estimatedReadingTimeInMinutes,
}: IBlog) {
  return (
    <Card>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbnail} alt={title} />
      <div className="mt-4 flex flex-col gap-2">
        <Categories categories={categories} />
        <Link href={`/blog/${id}`}>
          <h2 className="text-base">{title}</h2>
        </Link>
        <p>{summary}</p>
        <ProfileDate
          createdAt={createdAt}
          profile={profile}
          estimatedReadingTimeInMinutes={estimatedReadingTimeInMinutes}
        />
      </div>
    </Card>
  );
}
