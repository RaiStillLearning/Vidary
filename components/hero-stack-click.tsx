"use client";

import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HEROES = [
  { id: 1, src: "/movies/overlord.png" },
  { id: 2, src: "/movies/one-piece.png" },
  { id: 3, src: "/movies/adalah-pokoknya.png" },
];

export default function HeroStackClick() {
  const [active, setActive] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const activeIndex = HEROES.findIndex((h) => h.id === active);
  const prev = HEROES[activeIndex - 1];
  const current = HEROES[activeIndex];
  const next = HEROES[activeIndex + 1];

  const changeHero = (id: number) => {
    if (id === active) return;

    setIsFading(true);
    setTimeout(() => {
      setActive(id);
      setIsFading(false);
    }, 500); // durasi fade-out
  };

  return (
    <section className="relative px-6 pt-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative flex items-center justify-center">
          {/* LEFT PREVIEW */}
          {prev && (
            <button
              onClick={() => changeHero(prev.id)}
              className="absolute left-0 z-10 -translate-x-1/3 scale-95 opacity-70 transition hover:opacity-100"
            >
              <AspectRatio
                ratio={16 / 9}
                className="w-[70%] overflow-hidden rounded-xl bg-muted shadow-lg"
              >
                <Image
                  src={prev.src}
                  alt="Previous hero"
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </button>
          )}

          {/* ACTIVE HERO */}
          <div
            className={`z-20 w-full transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <AspectRatio
              ratio={16 / 9}
              className="overflow-hidden rounded-xl bg-muted shadow-2xl"
            >
              <Image
                key={current.id}
                src={current.src}
                alt="Active hero"
                fill
                priority
                className="object-cover"
              />
            </AspectRatio>
          </div>

          {/* RIGHT PREVIEW */}
          {next && (
            <button
              onClick={() => changeHero(next.id)}
              className="absolute right-0 z-10 translate-x-1/3 scale-95 opacity-70 transition hover:opacity-100"
            >
              <AspectRatio
                ratio={16 / 9}
                className="w-[70%] overflow-hidden rounded-xl bg-muted shadow-lg"
              >
                <Image
                  src={next.src}
                  alt="Next hero"
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </button>
          )}

          {/* ARROWS */}
          <button
            disabled={!prev}
            onClick={() => prev && changeHero(prev.id)}
            className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur disabled:opacity-30"
          >
            <ChevronLeft />
          </button>

          <button
            disabled={!next}
            onClick={() => next && changeHero(next.id)}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur disabled:opacity-30"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
