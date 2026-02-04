import { AnimeCard } from "@/lib/adapters/movies";
import Image from "next/image";

interface MovieGridProps {
  data: AnimeCard[];
}

export function MovieGrid({ data }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.map((item) => (
        <div key={item.slug} className="space-y-2">
          {/* Poster wrapper */}
          <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg bg-muted">
            <Image
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover"
              width={300}
              height={450}
            />
          </div>

          {/* Title */}
          <p className="text-sm font-medium line-clamp-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
