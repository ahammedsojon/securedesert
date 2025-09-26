import { ColumnProps } from "primereact/column";
import DataTableOptsProvider from "@/providers/datatable-opts";
import DataTable from "@/components/DataTable";
import UserTemplate from "./components/UserTemplate";
import DataTableOpts from "../challenges/components/DataTableOpts";
import PointsTemplate from "../challenges/components/PointsTemplate";

const response = {
  data: [
    {
      id: "clp737khn0000ated48hn09lf",
      name: "Akira San",
      username: "clp737khr0001ated1e4oa0xe",
      email: "otaku.fahad11@gmail.com",
      emailVerified: null,
      challenges_solved: 0,
      role: "ADMIN",
      points: 300,
      first_blood: 2,
      team: null,
      image: "/next.svg",
    },
    {
      id: "clp737khn0000ated48hn09lf",
      name: "Akira San",
      username: "clp737khr0001ated1e4oa0xe",
      email: "otaku.fahad11@gmail.com",
      emailVerified: null,
      challenges_solved: 0,
      role: "ADMIN",
      points: 300,
      first_blood: 2,
      team: null,
      image: "/next.svg",
    },
    {
      id: "clp737khn0000ated48hn09lf",
      name: "Akira San",
      username: "clp737khr0001ated1e4oa0xe",
      email: "otaku.fahad11@gmail.com",
      emailVerified: null,
      challenges_solved: 0,
      role: "ADMIN",
      points: 300,
      first_blood: 2,
      team: null,
      image: "/next.svg",
    },
    {
      id: "clp737khn0000ated48hn09lf",
      name: "Akira San",
      username: "clp737khr0001ated1e4oa0xe",
      email: "otaku.fahad11@gmail.com",
      emailVerified: null,
      challenges_solved: 0,
      role: "ADMIN",
      points: 300,
      first_blood: 2,
      team: null,
      image: "/next.svg",
    },
    {
      id: "clp737khn0000ated48hn09lf",
      name: "Akira San",
      username: "clp737khr0001ated1e4oa0xe",
      email: "otaku.fahad11@gmail.com",
      emailVerified: null,
      challenges_solved: 0,
      role: "ADMIN",
      points: 300,
      first_blood: 2,
      team: null,
      image: "/next.svg",
    },
    {
      id: "clp737khn0000ated48hn09lf",
      name: "Akira San",
      username: "clp737khr0001ated1e4oa0xe",
      email: "otaku.fahad11@gmail.com",
      emailVerified: null,
      challenges_solved: 0,
      role: "ADMIN",
      points: 300,
      first_blood: 2,
      team: null,
      image: "/next.svg",
    },
    {
      id: "clp737khn0000ated48hn09lf",
      name: "Akira San",
      username: "clp737khr0001ated1e4oa0xe",
      email: "otaku.fahad11@gmail.com",
      emailVerified: null,
      challenges_solved: 0,
      role: "ADMIN",
      points: 300,
      first_blood: 2,
      team: null,
      image: "/next.svg",
    },
  ],
};

export default function Wanted() {
  const columns = [
    {
      field: "name",
      header: "Name",
      body: UserTemplate,
    },
    {
      sortable: true,
      field: "challenges_solved",
      header: "Challenges Solved",
    },
    {
      sortable: true,
      field: "points",
      header: "Points",
      body: PointsTemplate,
    },
    {
      sortable: true,
      field: "first_blood",
      header: "First Blood",
    },
    {
      sortable: true,
      field: "team",
      header: "Team",
    },
  ] satisfies ColumnProps[];

  return (
    <DataTableOptsProvider>
      <DataTableOpts />
      <DataTable
        removableSort
        stripedRows
        value={response.data}
        columns={columns}
        paginator
        rows={5}
      />
    </DataTableOptsProvider>
  );
}
