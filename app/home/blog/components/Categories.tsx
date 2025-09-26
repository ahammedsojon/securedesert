import Category, { ICategory } from "./Category";

interface ICategoriesProps {
  categories: ICategory[];
}

export default function Categories({ categories }: ICategoriesProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <li key={category.id}>
          <Category {...category} />
        </li>
      ))}
    </ul>
  );
}
