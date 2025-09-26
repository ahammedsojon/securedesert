interface IStat {
  title: string;
  description: string;
}

const STATS: IStat[] = [
  { title: "100+", description: "Over 100 members enrolled" },
  { title: "100K+", description: "Trusted by over 100,000 cybersecurity professionals wordwide" },
  { title: "1M+", description: "1,000,000 active users monthly" },
];

function Stat({ title, description }: IStat) {
  return (
    <li className="flex flex-col items-center gap-4">
      <h3 className="shadow-primary text-shadow">{title}</h3>
      <p className="max-w-xs text-center text-primary">{description}</p>
    </li>
  );
}

export default function Stats() {
  return (
    <section className="relative z-10 -mt-56 border-y border-primary py-16 shadow-md lg:mt-0">
      <ul className="container flex flex-col justify-between gap-8 md:flex-row">
        {STATS.map((stat) => (
          <Stat key={stat.description} {...stat} />
        ))}
      </ul>
    </section>
  );
}
