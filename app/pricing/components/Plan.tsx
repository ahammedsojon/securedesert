import { Card } from "primereact/card";
import ButtonLink from "@/components/ButtonLink";
import PriceInUSDPerMonthOrText, { PriceInUSDPerMonthOrTextType } from "./PriceInUsdPerMonthOrText";
import Features, { IFeatures } from "./Features";

export interface IPlan extends IFeatures {
  id: string;
  title: string;
  description: string;
  priceInUSDPerMonthOrText: PriceInUSDPerMonthOrTextType;
  action: {
    label: string;
    href: string;
  };
  promote: boolean;
}

interface IPlanProps extends IPlan {}

export default function Plan({
  title,
  description,
  priceInUSDPerMonthOrText,
  action: { label, href },
  features,
  promote,
}: IPlanProps) {
  return (
    <li>
      <Card className="h-full">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg shadow-primary text-shadow">{title}</h2>
          <p className="h-14 leading-7">{description}</p>
          <PriceInUSDPerMonthOrText priceInUSDPerMonthOrText={priceInUSDPerMonthOrText} />
          <ButtonLink href={href} label={label} outlined={!promote} />
          <Features features={features} />
        </div>
      </Card>
    </li>
  );
}
