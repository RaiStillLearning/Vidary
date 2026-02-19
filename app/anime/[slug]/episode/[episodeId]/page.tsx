import { getEpisode, getServer } from "@/lib/api/episode.service";

interface PageProps {
  params: Promise<{ slug: string; episodeId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug, episodeId } = await params;

  const res = (await getEpisode(episodeId)) as any;
  const episode = res?.data ?? null;

  if (!episode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] gap-4">
        <div className="text-6xl">😵</div>
        <h2 className="text-2xl font-bold text-white">
          Episode Tidak Ditemukan
        </h2>
        <p className="text-zinc-400 text-sm">
          Episode ID:{" "}
          <code className="bg-zinc-800 px-2 py-0.5 rounded text-purple-400">
            {episodeId}
          </code>
        </p>
        <a
          href={`/anime/${slug}`}
          className="mt-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold transition"
        >
          ← Kembali ke Anime
        </a>
      </div>
    );
  }

  // Coba stream URL: default → fallback server[0]
  let streamUrl: string | null = episode.defaultStreamingUrl ?? null;
  if (
    !streamUrl &&
    Array.isArray(episode.server) &&
    episode.server.length > 0
  ) {
    try {
      const srv = (await getServer(episode.server[0].serverId)) as any;
      streamUrl = srv?.data?.url ?? null;
    } catch {
      streamUrl = null;
    }
  }

  const episodeList = episode.info?.episodeList ?? [];

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
          href={`/anime/${slug}`}
          className="text-zinc-400 hover:text-white transition text-sm"
        >
          ← Detail Anime
        </a>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300 text-sm truncate max-w-xs">
          {episode.title}
        </span>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold">{episode.title}</h1>

        {/* Stream Player */}
        {streamUrl ? (
          <div className="space-y-3">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-700/50 shadow-2xl shadow-purple-900/20">
              <iframe
                src={streamUrl}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <a
              href={streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-purple-400 hover:text-purple-300"
            >
              ↗ Buka di Tab Baru
            </a>
          </div>
        ) : (
          <div className="rounded-xl border border-yellow-700/40 bg-yellow-900/10 p-6 space-y-3">
            <p className="text-yellow-400 font-semibold">
              ⚠️ Stream Tidak Tersedia
            </p>
            <p className="text-zinc-400 text-sm">
              Server sedang bermasalah. Coba episode lain atau kembali nanti.
            </p>
            <a
              href={`/anime/${slug}`}
              className="inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition"
            >
              ← Kembali ke Daftar Episode
            </a>
          </div>
        )}

        {/* Episode List */}
        {episodeList.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Daftar Episode</h2>
            <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {episodeList.map((ep: any) => (
                <a
                  key={ep.episodeId}
                  href={`/anime/${slug}/episode/${ep.episodeId}`}
                  className={`rounded-lg p-3 text-center text-sm font-medium transition border ${
                    ep.episodeId === episodeId
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  Eps {ep.eps}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
