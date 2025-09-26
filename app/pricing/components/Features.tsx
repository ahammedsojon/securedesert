import Feature, { IFeature } from "./Feature";

export interface IFeatures {
  features: IFeature[];
}

interface IFeaturesProps extends IFeatures {}

export default function Features({ features }: IFeaturesProps) {
  return (
    <ul className="mt-2 flex flex-col gap-2">
      {features.map((feature) => (
        <Feature {...feature} />
      ))}
    </ul>
  );
}
