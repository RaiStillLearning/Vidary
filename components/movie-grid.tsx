import Image from "next/image";
import Link from "next/link";
import { AnimeCard } from "@/lib/adapters/movies";

interface MovieGridProps {
  data: AnimeCard[];
}

export function MovieGrid({ data }: MovieGridProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <div className="text-5xl">🎬</div>
        <p className="text-zinc-300 font-medium">Belum ada movie tersedia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.map((item) => (
        <Link
          key={item.slug}
          href={`/anime/${item.slug}`}
          className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900 transition-all duration-300 hover:scale-[1.03] hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20"
        >
          {/* Poster */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Movie badge */}
            <div className="absolute left-2 top-2 rounded-md border border-purple-500/50 bg-purple-600/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
              Movie
            </div>
          </div>

          {/* Title */}
          <div className="p-2.5">
            <p className="line-clamp-2 text-xs font-medium leading-tight text-white">
              {item.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
