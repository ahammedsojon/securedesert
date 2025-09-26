import Blog, { IBlog } from "./Blog";

interface IBlogsProps {
  blogs: IBlog[];
}

export default function Blogs({ blogs }: IBlogsProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Blog {...blog} />
        </li>
      ))}
    </ul>
  );
}
