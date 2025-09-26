import clsx from "clsx";

export interface IFeature {
  title: string;
  included: boolean;
}

interface IFeatureProps extends IFeature {}

export default function Feature({ title, included }: IFeatureProps) {
  return (
    <li className="flex gap-4">
      <i
        className={clsx("pi", {
          "pi-check-circle text-success": included,
          "pi-times-circle text-danger": !included,
        })}
      />
      <span className="text-foreground-alt">{title}</span>
    </li>
  );
}
