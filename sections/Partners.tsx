import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Card } from "primereact/card";

interface IPartner {
  logo: string;
}

const PARTNERS = [
  {
    logo: "/next.svg",
  },
  {
    logo: "/next.svg",
  },
  {
    logo: "/next.svg",
  },
  {
    logo: "/next.svg",
  },
];

function Partner({ logo }: IPartner) {
  return (
    <li>
      <Card>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-12 w-auto object-cover" src={logo} alt="Our Partner" />
      </Card>
    </li>
  );
}

function PartnersContainer({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "flex w-1/2 animate-scroll-fast items-center justify-between gap-4 py-16 group-hover:paused md:animate-scroll-slow",
        className,
      )}
    >
      {PARTNERS.map((partner) => (
        <Partner key={partner.logo} {...partner} />
      ))}
      <li />
    </ul>
  );
}

export default function Partners() {
  return (
    <section className="overflow-x-hidden py-16">
      <h2 className="pb-8 text-center shadow-primary text-shadow">Our Partners</h2>
      <div className="relative">
        <div
          className={clsx(
            "group flex w-[200%] items-center",
            "before:absolute before:inset-y-0 before:left-0 before:z-20 before:h-full before:w-32 before:bg-gradient-to-r before:from-background before:to-transparent",
            "after:absolute after:inset-y-0 after:right-0 after:z-20 after:h-full after:w-32 after:bg-gradient-to-l after:from-background after:to-transparent",
          )}
        >
          <PartnersContainer />
          <PartnersContainer />
        </div>
      </div>
    </section>
  );
}
