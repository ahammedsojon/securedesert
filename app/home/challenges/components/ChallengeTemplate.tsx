import { ColumnProps } from "primereact/column";
import DataTable from "@/components/DataTable";
import TitleTemplate from "./TitleTemplate";
import DifficultyTemplate from "./DifficultyTemplate";
import { IChallenge } from "../types";
import PointsTemplate from "./PointsTemplate";

interface IChallengeTemplateProps {
  data: IChallenge[];
}

export default function ChallengeTemplate({ data }: IChallengeTemplateProps) {
  const columns = [
    {
      field: "title",
      header: "Challenge",
      body: TitleTemplate,
      filter: true,
      filterPlaceholder: "Search by Title",
    },
    {
      field: "difficulty",
      header: "Difficulty",
      body: DifficultyTemplate,
      filter: true,
      filterPlaceholder: "Search by Difficulty",
    },
    {
      field: "category",
      header: "Category",
      filter: true,
      filterPlaceholder: "Search by Category",
    },
    {
      field: "points",
      header: "Points",
      body: PointsTemplate,
      sortable: true,
    },
  ] satisfies ColumnProps[];

  return <DataTable columns={columns} value={data} removableSort stripedRows />;
}
