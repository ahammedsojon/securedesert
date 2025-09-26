import DataTable from "@/components/DataTable";
import { ColumnProps } from "primereact/column";
import DataTableOptsProvider from "@/providers/datatable-opts";
import DataTableOpts from "../challenges/components/DataTableOpts";

const response = {
  data: [
    {
      id: "clpl8vr5a0003i0uo8cebb46f",
      name: "team 2",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:41:53.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
    {
      id: "clpl9acar0007i0uo4nfwv6gt",
      name: "team 3",
      leader: "clpjyg7vo0000i0kxgw5254bo",
      created_date: "2023-11-30T13:53:13.000Z",
    },
  ],
};

export default async function Teams() {
  const columns = [
    {
      field: "id",
      header: "ID",
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "leader",
      header: "Leader",
    },
    {
      field: "created_date",
      header: "Created Date",
    },
  ] satisfies ColumnProps[];

  return (
    <DataTableOptsProvider>
      <DataTableOpts />
      <DataTable columns={columns} removableSort value={response.data} paginator rows={5} />
    </DataTableOptsProvider>
  );
}
