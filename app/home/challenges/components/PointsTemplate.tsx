"use client";

import { IChallenge } from "../types";

export interface IPointsTemplate extends IChallenge {}

interface IPointsTemplateProps extends IPointsTemplate {}

export default function PointsTemplate({ points }: IPointsTemplateProps) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://app.hackthebox.com/images/icons/ic-machines/ic-mc-points.svg"
        alt="points"
      />
      <span className="text-foreground">{points}</span>
      <span className="text-foreground-alt"> pts</span>
    </div>
  );
}
