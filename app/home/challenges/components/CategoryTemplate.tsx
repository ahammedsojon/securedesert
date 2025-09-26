import { ICategory } from "../types";

interface ICategoryTemplate extends ICategory {}

interface ICategoryTemplateProps extends ICategoryTemplate {}

export default function CategoryTemplate({ title, icon }: ICategoryTemplateProps) {
  return (
    <div className="flex items-center gap-4">
      {icon && (
        <img
          width={24}
          height={24}
          className="size-6 rounded-full object-cover"
          src={icon}
          alt={title}
        />
      )}

      <span>{title}</span>
    </div>
  );
}
