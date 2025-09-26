import { ICategory } from "../types";

interface ITotalCategoriesTemplate extends ICategory {}

interface ITotalCategoriesTemplateProps extends ITotalCategoriesTemplate {}

export default function TotalCategoriesTemplate({ title, data }: ITotalCategoriesTemplateProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-foreground">{data.length}</span>
      <span className="text-foreground-alt">{title} challenges</span>
    </div>
  );
}
