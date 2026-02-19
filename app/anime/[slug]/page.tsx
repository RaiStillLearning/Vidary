import { getAnimeDetail } from "@/lib/api/api";
import { EpisodeList } from "@/components/EpisodeList";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getSynopsisText(synopsis: any): string {
  if (!synopsis) return "";
  if (typeof synopsis === "string") return synopsis;
  if (typeof synopsis === "object") {
    if (Array.isArray(synopsis.paragraphs)) {
      return synopsis.paragraphs.join(" ");
    }
    const firstString = Object.values(synopsis).find(
      (v) => typeof v === "string",
    );
    if (firstString) return firstString as string;
  }
  return "";
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const res = (await getAnimeDetail(slug)) as any;
  const anime = res?.data ?? null;

  if (!anime) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] gap-4">
        <div className="text-6xl">😵</div>
        <h2 className="text-2xl font-bold text-white">Anime Tidak Ditemukan</h2>
        <a
          href="/"
          className="mt-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold transition"
        >
          ← Beranda
        </a>
      </div>
    );
  }

  const episodeList = anime.episodeList ?? anime.info?.episodeList ?? [];
  const synopsisText = getSynopsisText(anime.synopsis);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 60%, #0a0a0f 100%)",
      }}
    >
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 backdrop-blur-md bg-black/40 px-6 py-3 flex items-center gap-3">
        <a
          href="/"
          className="text-zinc-400 hover:text-white transition text-sm"
        >
          ← Beranda
        </a>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300 text-sm truncate max-w-xs">
          {anime.title}
        </span>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Anime Info */}
        <div className="flex gap-6">
          {anime.poster && (
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-40 rounded-xl object-cover shrink-0 shadow-lg"
            />
          )}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold">{anime.title}</h1>

            {synopsisText && (
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-5">
                {synopsisText}
              </p>
            )}

            {anime.genreList && (
              <div className="flex flex-wrap gap-2">
                {anime.genreList.map((g: any) => (
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

        {/* Episode List */}
        {episodeList.length > 0 ? (
          <EpisodeList episodes={episodeList} slug={slug} />
        ) : (
          <p className="text-zinc-500 text-sm">Tidak ada episode tersedia.</p>
        )}
      </div>
    </div>
  );
}
