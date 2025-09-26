"use client";

import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { parseAsInteger, useQueryState } from "next-usequerystate";
import Blogs from "./components/Blogs";

const dummy = {
  totalRecords: 114,
  data: [
    {
      id: "1",
      title: "Lorem Ipsum Dolor Sit Amet Qui Minim Labore",
      summary:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: 1700144735868,
      profile: {
        name: "John Doe",
        avatar: "/next.svg",
      },
      thumbnail: "/next.svg",
      categories: [
        { id: "1", label: "cybersecurity" },
        { id: "2", label: "kali linux" },
      ],
      estimatedReadingTimeInMinutes: 4,
    },
    {
      id: "2",
      title: "Lorem Ipsum Dolor Sit Amet Qui Minim Labore",
      summary:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: 1700144735868,
      profile: {
        name: "John Doe",
        avatar: "/next.svg",
      },
      thumbnail: "/next.svg",
      categories: [
        { id: "1", label: "cybersecurity" },
        { id: "2", label: "kali linux" },
      ],
      estimatedReadingTimeInMinutes: 4,
    },
    {
      id: "3",
      title: "Lorem Ipsum Dolor Sit Amet Qui Minim Labore",
      summary:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: 1700144735868,
      profile: {
        name: "John Doe",
        avatar: "/next.svg",
      },
      thumbnail: "/next.svg",
      categories: [
        { id: "1", label: "cybersecurity" },
        { id: "2", label: "kali linux" },
      ],
      estimatedReadingTimeInMinutes: 4,
    },
    {
      id: "4",
      title: "Lorem Ipsum Dolor Sit Amet Qui Minim Labore",
      summary:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: 1700144735868,
      profile: {
        name: "John Doe",
        avatar: "/next.svg",
      },
      thumbnail: "/next.svg",
      categories: [
        { id: "1", label: "cybersecurity" },
        { id: "2", label: "kali linux" },
      ],
      estimatedReadingTimeInMinutes: 4,
    },
    {
      id: "5",
      title: "Lorem Ipsum Dolor Sit Amet Qui Minim Labore",
      summary:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: 1700144735868,
      profile: {
        name: "John Doe",
        avatar: "/next.svg",
      },
      thumbnail: "/next.svg",
      categories: [
        { id: "1", label: "cybersecurity" },
        { id: "2", label: "kali linux" },
      ],
      estimatedReadingTimeInMinutes: 4,
    },
    {
      id: "6",
      title: "Lorem Ipsum Dolor Sit Amet Qui Minim Labore",
      summary:
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      createdAt: 1700144735868,
      profile: {
        name: "John Doe",
        avatar: "/next.svg",
      },
      thumbnail: "/next.svg",
      categories: [
        { id: "1", label: "cybersecurity" },
        { id: "2", label: "kali linux" },
      ],
      estimatedReadingTimeInMinutes: 4,
    },
  ],
};

export default function BlogsPage() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const rows = 6;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.page + 1);
  };

  return (
    <>
      <Blogs blogs={dummy.data} />
      <Paginator
        first={page * rows - 1}
        rows={rows}
        totalRecords={dummy.totalRecords}
        onPageChange={onPageChange}
      />
    </>
  );
}
