import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface AnimeCardProps {
  slug: string;
  title: string;
  image: string;
  episode?: string;
}

export default function AnimeCard({
  slug,
  title,
  image,
  episode,
}: AnimeCardProps) {
  return (
    <Link href={`/anime/${slug}`} className="group">
      <Card className="overflow-hidden border-0 bg-zinc-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={
                image ||
                "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400"
              }
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Episode Badge */}
            {episode && (
              <div className="absolute bottom-2 left-2">
                <span className="rounded-md bg-purple-600 px-2 py-1 text-xs font-semibold text-white">
                  {episode}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="p-3">
            <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-purple-400">
              {title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
