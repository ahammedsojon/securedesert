import clsx from "clsx";

export default function ChallengesActions() {
  return (
    <div className="flex border-b border-primary bg-card p-4">
      {[
        {
          icon: "pi-box",
          title: "NEW Challenge",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        },
        {
          icon: "pi-server",
          title: "NEW RELEASE",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        },
        {
          icon: "pi-flag",
          title: "NEW Battle",
          description:
            "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
        },
      ].map(({ title, description, icon }, idx) => (
        <div key={idx} className="flex items-center gap-4 p-8">
          <i
            className={clsx("pi rounded-full bg-background p-6 text-primary", icon)}
            style={{ fontSize: "2.5rem" }}
          />
          <div>
            <h3 className="text-md">{title}</h3>
            <p className="text-sm text-foreground-alt">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
