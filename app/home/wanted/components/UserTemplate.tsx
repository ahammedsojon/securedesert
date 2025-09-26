"use client";

import Image from "next/image";

interface IUserTemplateProps {
  name: string;
  email: string;
  image: string;
}

export default function UserTemplate({ name, email, image }: IUserTemplateProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        width={48}
        height={48}
        className="size-12 rounded-full object-cover"
        src={image}
        alt=""
      />
      <div className="flex flex-col">
        <span>{name}</span>
        <span className="text-sm text-foreground-alt">{email}</span>
      </div>
    </div>
  );
}
