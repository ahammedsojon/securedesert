import Image from "next/image";
import { Card } from "primereact/card";

interface IFeature {
  icon: string;
  label: string;
}

const FEATURES: IFeature[] = [
  {
    icon: "/imgs/courses.png",
    label: "Comprehensive Courses",
  },
  {
    icon: "/imgs/exercises.png",
    label: "Challenging Exercises",
  },
  {
    icon: "/imgs/battles.png",
    label: "Desert Battles",
  },
];

function Feature({ icon, label }: IFeature) {
  return (
    <li className="flex-1">
      <Card>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <Image
            width={176}
            height={176}
            src={icon}
            alt={label}
            className="h-44 w-auto object-contain"
          />
          <h3 className="text-center text-base">{label}</h3>
        </div>
      </Card>
    </li>
  );
}

export default function Features() {
  return (
    <section className="container py-16">
      <h2 className="pb-8 text-center shadow-primary text-shadow">Features</h2>
      <ul className="flex flex-col gap-4 md:flex-row">
        {FEATURES.map((feature) => (
          <Feature key={feature.label} {...feature} />
        ))}
      </ul>
    </section>
  );
}
