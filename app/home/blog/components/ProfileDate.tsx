import { timeStampToDate } from "@/lib/utils";
import { Avatar } from "primereact/avatar";

export interface IDate {
  createdAt: number;
}

export interface IProfile {
  avatar: string;
  name: string;
}

export interface IProfileDate extends IDate {
  profile: IProfile;
  estimatedReadingTimeInMinutes: number;
}

interface IProfileDateProps extends IProfileDate {}

export default function Profile({
  profile: { avatar, name },
  estimatedReadingTimeInMinutes,
  createdAt,
}: IProfileDateProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar image={avatar} size="large" shape="circle" />
      <div>
        <h3 className="text-sm">{name}</h3>
        <div className="flex items-center gap-2">
          <span>{timeStampToDate(createdAt)}</span>
          <span>·</span>
          <span>{estimatedReadingTimeInMinutes} min read</span>
        </div>
      </div>
    </div>
  );
}
