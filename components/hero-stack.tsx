"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroStack() {
  return (
    <section className="relative pt-6">
      <div className="relative mx-auto max-w-[1400px] overflow-x-auto px-6">
        <div className="flex items-center gap-[-120px]">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`
                relative
                transition-transform duration-300
                ${i === 2 ? "z-20 scale-100" : "z-10 scale-95"}
              `}
              style={{
                minWidth: "70%",
                marginLeft: i !== 1 ? "-120px" : "0",
              }}
            >
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl bg-muted shadow-xl"
              >
                <Image
                  src={`https://avatar.vercel.sh/hero-${i}`}
                  alt={`Hero ${i}`}
                  fill
                  priority={i === 2}
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