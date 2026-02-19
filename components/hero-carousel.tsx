"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroCarousel() {
  return (
    <section className="px-6 pt-6">
      <div className="mx-auto max-w-7xl">
        <AspectRatio
          ratio={16 / 9}
          className="overflow-hidden rounded-xl bg-muted"
        >
          <Image
            src="https://avatar.vercel.sh/vidary"
            alt="Hero"
            fill
            priority
            className="object-cover"
          />
        </AspectRatio>
      </div>
    </section>
  );
}
