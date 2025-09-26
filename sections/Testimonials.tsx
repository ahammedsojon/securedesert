"use client";

import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";

interface Testimonial {
  avatar: string;
  name: string;
  position: string;
  content: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    avatar: "/next.svg",
    name: "Samuel Graves",
    position: "Museum Worker at Tella Ltd",
    content:
      "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
  },
  {
    avatar: "/next.svg",
    name: "Samuel Graves",
    position: "Museum Worker at Tella Ltd",
    content:
      "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
  },
  {
    avatar: "/next.svg",
    name: "Samuel Graves",
    position: "Museum Worker at Tella Ltd",
    content:
      "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
  },
];

function TestimonialTemplate({ name, avatar, position, content }: Testimonial) {
  return (
    <Card>
      <div className="mb-4 flex items-center gap-4">
        <Avatar
          image={avatar}
          size="xlarge"
          shape="circle"
          className="border border-primary shadow-sm"
        />
        <div className="flex flex-col">
          <h3 className="text-md">{name}</h3>
          <p>{position}</p>
        </div>
      </div>
      <p>{content}</p>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section className="container py-16">
      <h2 className="pb-8 text-center shadow-primary text-shadow">Testimonials</h2>
      <Carousel circular value={TESTIMONIALS} itemTemplate={TestimonialTemplate} />
    </section>
  );
}
