"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AnimeCard {
  title: string;
  slug: string;
  image: string;
}

export default function MovieRow({
  title,
  data,
}: {
  title: string;
  data: AnimeCard[];
}) {
  const [index, setIndex] = useState(0);
  const ITEM_WIDTH = 296;

  if (!data.length) return null;

  const maxIndex = data.length - 1;
  const isAtStart = index === 0;
  const isAtEnd = index === maxIndex;

  return (
    <section className="relative">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      <div className="relative overflow-hidden">
        {/* LEFT */}
        <button
          disabled={isAtStart}
          onClick={() => setIndex((i) => i - 1)}
          className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2
            ${isAtStart ? "cursor-not-allowed opacity-30" : "bg-background/80"}
          `}
        >
          <ChevronLeft />
        </button>

        {/* SLIDER */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * ITEM_WIDTH}px)` }}
        >
          {data.map((anime) => (
            <Link
              key={anime.slug}
              href={`/anime/${anime.slug}`}
              className="mr-4 block w-[280px] flex-shrink-0"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={anime.image}
                  alt={anime.title}
                  width={400}
                  height={225}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-2 line-clamp-1 text-sm font-medium">
                {anime.title}
              </p>
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <button
          disabled={isAtEnd}
          onClick={() => setIndex((i) => i + 1)}
          className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-2
            ${isAtEnd ? "cursor-not-allowed opacity-30" : "bg-background/80"}
          `}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
