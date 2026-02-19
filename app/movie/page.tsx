import Image from "next/image";
import Link from "next/link";
import { Clapperboard, Star, ChevronLeft, ChevronRight } from "lucide-react";

const BASE = "https://www.sankavollerei.com/anime/samehadaku";

function toText(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object") {
    if ("value" in val) return String(val.value);
    const first = Object.values(val).find(
      (v) => typeof v === "string" || typeof v === "number",
    );
    if (first !== undefined) return String(first);
  }
  return "";
}

async function getMovies(page: number) {
  const res = await fetch(`${BASE}/movies?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) return { movies: [], totalPages: 1 };
  const data = await res.json();
  return {
    movies: (data?.data?.animeList ?? []) as any[],
    totalPages: data?.pagination?.totalPages ?? 1,
    hasNext: data?.pagination?.hasNextPage ?? false,
    hasPrev: data?.pagination?.hasPrevPage ?? false,
  };
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));
  const { movies, totalPages, hasNext, hasPrev } = await getMovies(page);

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 60%, #0a0a0f 100%)",
      }}
    >
      {/* Header */}
      <div className="border-b border-zinc-800/60 px-6 py-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-600/20 p-2 border border-purple-500/30">
              <Clapperboard className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Movie Anime</h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                {movies.length} movie • Halaman {page} dari {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="text-5xl">🎬</div>
            <p className="text-zinc-400">Tidak ada movie tersedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie: any) => (
              <Link
                key={movie.animeId}
                href={`/movie/${movie.animeId}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900 transition-all duration-300 hover:scale-[1.03] hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Score badge */}
                  {movie.score && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/70 backdrop-blur-sm px-2 py-0.5 border border-zinc-700/50">
                      <Star className="h-2.5 w-2.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-[10px] font-semibold text-white">
                        {toText(movie.score)}
                      </span>
                    </div>
                  )}

                  {/* Movie badge */}
                  <div className="absolute top-2 right-2 rounded-md bg-purple-600/80 backdrop-blur-sm px-2 py-0.5 border border-purple-500/50">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-white">
                      Movie
                    </span>
                  </div>

                  {/* Play icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="rounded-full bg-purple-600/90 p-3">
                      <svg
                        className="h-5 w-5 text-white fill-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 space-y-1">
                  <p className="line-clamp-2 text-xs font-medium leading-tight text-white">
                    {movie.title}
                  </p>
                  {movie.genreList?.length > 0 && (
                    <p className="text-[10px] text-zinc-500 truncate">
                      {movie.genreList
                        .slice(0, 2)
                        .map((g: any) => g.title)
                        .join(" • ")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            <Link
              href={`/movie?page=${page - 1}`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border transition ${
                hasPrev
                  ? "border-zinc-700 text-zinc-300 hover:border-purple-500 hover:text-white"
                  : "border-zinc-800 text-zinc-600 pointer-events-none"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Sebelumnya
            </Link>

            <span className="text-sm text-zinc-500">
              {page} / {totalPages}
            </span>

            <Link
              href={`/movie?page=${page + 1}`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border transition ${
                hasNext
                  ? "border-zinc-700 text-zinc-300 hover:border-purple-500 hover:text-white"
                  : "border-zinc-800 text-zinc-600 pointer-events-none"
              }`}
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
