export type PriceInUSDPerMonthOrTextType = number | string;

interface IPriceInUSDPerMonthOrTextProps {
  priceInUSDPerMonthOrText: PriceInUSDPerMonthOrTextType;
}

export default function PriceInUSDPerMonthOrText({
  priceInUSDPerMonthOrText,
}: IPriceInUSDPerMonthOrTextProps) {
  const pot = priceInUSDPerMonthOrText;

  if (typeof pot === "string") {
    return <div className="py-2 text-xl leading-none text-white">{pot}</div>;
  }

  return (
    <div className="flex items-end gap-2 py-2">
      <span className="text-xl leading-none text-white">${pot.toString()}</span>
      <span className="text-foreground-alt">/month</span>
    </div>
  );
}
