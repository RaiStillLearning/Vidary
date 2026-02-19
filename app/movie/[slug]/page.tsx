import { notFound } from "next/navigation";
import Link from "next/link";
import { Star } from "lucide-react";
import { MoviePlayer } from "@/components/MoviePlayer";

const BASE = "https://www.sankavollerei.com/anime/samehadaku";

async function getMovieDetail(slug: string) {
  const res = await fetch(`${BASE}/anime/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

async function getEpisodeData(episodeId: string) {
  const res = await fetch(`${BASE}/episode/${episodeId}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.data ?? null;
}

function toText(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object") {
    if ("value" in val) return String(val.value);
    if (Array.isArray(val.paragraphs)) return val.paragraphs.join("\n\n");
    const first = Object.values(val).find(
      (v) => typeof v === "string" || typeof v === "number",
    );
    if (first !== undefined) return String(first);
  }
  return "";
}

// Flatten server.qualities[].serverList[] menjadi [{quality, title, serverId}]
function flattenServers(
  server: any,
): { quality: string; title: string; serverId: string }[] {
  if (!server?.qualities) return [];
  const result: { quality: string; title: string; serverId: string }[] = [];
  for (const q of server.qualities) {
    if (!Array.isArray(q.serverList)) continue;
    for (const s of q.serverList) {
      if (!s.serverId) continue;
      result.push({
        quality: q.title,
        title: s.title ?? q.title,
        serverId: s.serverId,
      });
    }
  }
  return result;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MovieWatchPage({ params }: PageProps) {
  const { slug } = await params;
  const movie = await getMovieDetail(slug);
  if (!movie) notFound();

  const episodeId = movie.episodeList?.[0]?.episodeId ?? null;
  const episodeData = episodeId ? await getEpisodeData(episodeId) : null;

  const servers = flattenServers(episodeData?.server);
  const defaultUrl = episodeData?.defaultStreamingUrl ?? null;
  const genreList: any[] = movie.genreList ?? [];
  const scoreText = toText(movie.score);
  const synopsisText = Array.isArray(movie.synopsis?.paragraphs)
    ? movie.synopsis.paragraphs.join("\n\n")
    : toText(movie.synopsis);

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 60%, #0a0a0f 100%)",
      }}
    >
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800/60 px-6 py-3">
        <div className="mx-auto max-w-5xl flex items-center gap-2 text-sm">
          <Link href="/" className="text-zinc-400 hover:text-white transition">
            Beranda
          </Link>
          <span className="text-zinc-700">/</span>
          <Link
            href="/movie"
            className="text-zinc-400 hover:text-white transition"
          >
            Movie
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300 truncate max-w-xs">
            {toText(movie.title) || slug}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Player */}
        <MoviePlayer servers={servers} defaultUrl={defaultUrl} />

        {/* Movie Info */}
        <div className="flex gap-5">
          {movie.poster && (
            <img
              src={toText(movie.poster)}
              alt={toText(movie.title) || slug}
              className="w-32 rounded-xl object-cover shrink-0 shadow-lg hidden sm:block"
            />
          )}
          <div className="space-y-3 flex-1">
            <div className="flex items-start gap-3 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold leading-tight">
                {toText(movie.title) || slug}
              </h1>
              {scoreText && (
                <div className="flex items-center gap-1 rounded-md bg-zinc-800 border border-zinc-700/50 px-2 py-1 shrink-0">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold">{scoreText}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
              {movie.duration && <span>⏱ {toText(movie.duration)}</span>}
              {movie.aired && <span>📅 {toText(movie.aired)}</span>}
              {movie.studios && <span>🎬 {toText(movie.studios)}</span>}
              {movie.status && <span>📺 {toText(movie.status)}</span>}
            </div>

            {synopsisText && (
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-5">
                {synopsisText}
              </p>
            )}

            {genreList.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {genreList.map((g: any) => (
                  <span
                    key={g.genreId}
                    className="px-3 py-1 bg-zinc-800 border border-zinc-700/50 rounded-full text-xs text-zinc-300"
                  >
                    {g.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
