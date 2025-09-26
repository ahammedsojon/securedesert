"use client";

import { useDataTableOpts } from "@/providers/datatable-opts";
import { Column, ColumnProps } from "primereact/column";
import { DataTable, DataTableProps, DataTableValueArray } from "primereact/datatable";

type IDataTableProps<TValue extends DataTableValueArray> = DataTableProps<TValue> & {
  columns: ColumnProps[];
};

export default function OptsDataTable<TValue extends DataTableValueArray>({
  columns,
  ...props
}: IDataTableProps<TValue>) {
  const { size } = useDataTableOpts();

  return (
    <DataTable {...props} size={size}>
      {columns.map((col, idx) => (
        <Column key={idx} {...col} />
      ))}
    </DataTable>
  );
}
