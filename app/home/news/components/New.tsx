import { timeStampToDate } from "@/lib/utils";
import { Card } from "primereact/card";

export interface INew {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export default function New({ title, content, createdAt }: INew) {
  return (
    <Card>
      <p>{timeStampToDate(createdAt)}</p>
      <h3 className="my-2 text-md">{title}</h3>
      <div className="">{content}</div>
    </Card>
  );
}
