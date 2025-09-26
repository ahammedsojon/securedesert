import { sizeType } from "@/providers/datatable-opts";
import { LucideIcon } from "lucide-react";

export interface ISizeOpts {
  Icon: LucideIcon;
  value: sizeType;
}

interface ISizeTemplateProps extends ISizeOpts {}

export default function SizeTemplate({ Icon }: ISizeTemplateProps) {
  return <Icon className="size-5" />;
}
