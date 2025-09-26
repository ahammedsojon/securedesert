"use client";

import DataTableOptsProvider from "@/providers/datatable-opts";
import { ColumnProps } from "primereact/column";
import { DataTableExpandedRows, DataTableRowToggleEvent } from "primereact/datatable";
import { useState } from "react";
import DataTable from "@/components/DataTable";
import CategoryTemplate from "./components/CategoryTemplate";
import ChallengeTemplate from "./components/ChallengeTemplate";
import DataTableOpts from "./components/DataTableOpts";
import TotalCategoriesTemplate from "./components/TotalCategoriesTemplate";
import { ICategory, IChallenge } from "./types";
import ChallengesActions from "./components/ChallengesActions";

const response = {
  data: [
    {
      title: "Pwn",
      icon: "https://www.hackthebox.com/storage/challenge_categories/a87ff679a2f3e71d9181a67b7542122c.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "web",
          title: "ctf_web",
          thumbnail: "/vercel.svg",
          difficulty: "hard",
          points: 50,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "easy",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Hardware",
      icon: "https://www.hackthebox.com/storage/challenge_categories/d3d9446802a44259755d38e6d163e820.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Crypto",
      icon: "https://www.hackthebox.com/storage/challenge_categories/c81e728d9d4c2f636f067f89cc14862c.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Reversing",
      icon: "https://www.hackthebox.com/storage/challenge_categories/c4ca4238a0b923820dcc509a6f75849b.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "GamePwn",
      icon: "https://www.hackthebox.com/storage/challenge_categories/6512bd43d9caa6e02c990b0a82652dca.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Blockhcain",
      icon: "https://www.hackthebox.com/storage/challenge_categories/c20ad4d76fe97759aa27a0c99bff6710.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Forensics",
      icon: "https://www.hackthebox.com/storage/challenge_categories/8f14e45fceea167a5a36dedd4bea2543.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Misc",
      icon: "https://www.hackthebox.com/storage/challenge_categories/1679091c5a880faf6fb5e6087eb1b2dc.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Mobile",
      icon: "https://www.hackthebox.com/storage/challenge_categories/c9f0f895fb98ab9159f51fd0297e236d.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
    {
      title: "Web",
      icon: "https://www.hackthebox.com/storage/challenge_categories/e4da3b7fbbce2345d7772b0674a318d5.svg",
      data: [
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "medium",
          points: 100,
        },
        {
          id: "dslfkdjslfkdjlkjflds",
          category: "dlkf",
          title: "ldkf",
          thumbnail: "/vercel.svg",
          difficulty: "insane",
          points: 100,
        },
      ],
    },
  ] satisfies ICategory[],
};

export default function Challenges() {
  const [expandedRows, setExpandedRows] = useState<IChallenge[] | DataTableExpandedRows>([]);

  const handleRowToggle = (e: DataTableRowToggleEvent) => setExpandedRows(e.data);

  const columns = [
    {
      expander: true,
      style: { width: "1rem" },
    },
    {
      field: "title",
      header: "Category",
      body: CategoryTemplate,
      style: { width: "100%" },
    },
    {
      body: TotalCategoriesTemplate,
      style: { whiteSpace: "nowrap" },
    },
  ] satisfies ColumnProps[];

  return (
    <DataTableOptsProvider>
      <ChallengesActions />
      <DataTableOpts />
      <DataTable
        columns={columns}
        removableSort
        stripedRows
        value={response.data}
        expandedRows={expandedRows}
        onRowToggle={handleRowToggle}
        rowExpansionTemplate={ChallengeTemplate}
        paginator
        rows={5}
      />
    </DataTableOptsProvider>
  );
}
