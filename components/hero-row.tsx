"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroRow() {
  return (
    <section className="px-6 pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-6 overflow-x-auto scroll-smooth">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-full md:min-w-[90%] lg:min-w-[80%]"
            >
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl bg-muted"
              >
                <Image
                  src={`https://avatar.vercel.sh/hero-${i}`}
                  alt={`Hero ${i}`}
                  fill
                  priority={i === 1}
                  className="object-cover"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}