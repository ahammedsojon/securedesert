import { Chip } from "primereact/chip";

export interface ICategory {
  id: string;
  label: string;
}

interface ICategoryProps extends ICategory {}

export default function Category({ label }: ICategoryProps) {
  return <Chip label={label} />;
}
