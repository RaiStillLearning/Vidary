"use client";

import Link from "next/link";
import Image from "next/image";

interface AnimeCardProps {
  slug: string;
  title: string;
  image: string;
  episodes?: number;
  releaseDay?: string;
  latestReleaseDate?: string;
}

export default function AnimeCard({
  slug,
  title,
  image,
  episodes,
  releaseDay,
  latestReleaseDate,
}: AnimeCardProps) {
  return (
    <Link
      href={`/anime/${slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800/60 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-purple-900/20"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600 text-xs">
            No Image
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Episode badge */}
        {episodes !== undefined && (
          <div className="absolute top-2 right-2 rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5 text-xs font-semibold text-white border border-zinc-700/50">
            Ep {episodes}
          </div>
        )}

        {/* Latest release date badge */}
        {latestReleaseDate && (
          <div className="absolute bottom-2 left-2 rounded-md bg-purple-600/90 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-white">
            {latestReleaseDate}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 space-y-0.5">
        <p className="text-xs font-medium text-white leading-tight line-clamp-2">
          {title}
        </p>
        {releaseDay && (
          <p className="text-[11px] text-zinc-500">{releaseDay}</p>
        )}
      </div>
    </Link>
  );
}
