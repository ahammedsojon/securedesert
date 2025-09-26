interface ITitleTemplateProps {
  title: string;
  thumbnail: string;
}

export default function TitleTemplate({ thumbnail, title }: ITitleTemplateProps) {
  return (
    <div className="flex items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        width={48}
        height={48}
        className="size-12 rounded-full object-cover"
        src={thumbnail}
        alt=""
      />
      <span>{title}</span>
    </div>
  );
}
