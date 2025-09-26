"use client";

import Background from "@/components/Background";
import { Button } from "primereact/button";
import useScreenSize from "@/hooks/useScreenSize";
import clsx from "clsx";
import { createRef, useEffect, useState } from "react";

// interface IHeroProps {}

function Hero(/* props: IHeroProps */) {
  const bgRef = createRef<SVGSVGElement>();
  const [bgHeight, setBgHeight] = useState(0);
  const screenSize = useScreenSize();
  const isScreenLg = screenSize.width >= 1024;

  useEffect(() => {
    setBgHeight(bgRef.current?.clientHeight || 0);
  }, [bgRef, screenSize]);

  return (
    <section className="mx-auto flex w-full max-w-[1400px] flex-col lg:flex-row-reverse lg:px-8">
      <div
        className={clsx(
          "relative lg:flex-[0.5]",
          "before:absolute before:inset-x-0 before:bottom-0 before:z-0 before:h-3/4 before:w-full before:bg-gradient-to-b before:from-transparent before:to-background",
          "lg:before:hidden",
        )}
      >
        <Background ref={bgRef} className="h-auto w-full" />
      </div>
      <div
        style={{
          transform: isScreenLg ? "translateY(0)" : `translateY(${-bgHeight / 2}px)`,
        }}
        className="flex flex-col justify-center p-8 shadow-primary lg:flex-[.5] lg:pl-0"
      >
        <h1 className="text-shadow">Secure Desert</h1>
        <p className="mb-8 text-primary">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum voluptas hic incidunt
          quidem necessitatibus quia architecto aliquid suscipit doloribus molestias, qui eius quas
          dolor blanditiis, distinctio pariatur. Iusto, nostrum sequi.
        </p>
        <div className="flex flex-col gap-4 xs:flex-row">
          <Button label="Start Now" size="large" />
          <Button label="Start Now" outlined size="large" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
