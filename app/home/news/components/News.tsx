import New, { INew } from "./New";

interface INews {
  news: INew[];
}

interface INewsProps extends INews {}

export default function News({ news }: INewsProps) {
  return (
    <ul className="flex flex-col gap-4">
      {news.map((_new) => (
        <li key={_new.id}>
          <New {..._new} />
        </li>
      ))}
    </ul>
  );
}
