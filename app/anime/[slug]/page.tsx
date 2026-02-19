import { getEpisode } from "@/lib/api/episode.service";
import type { EpisodeResponse } from "@/types/episode";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ episode?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  // ===============================
  // NEXT 16 SAFE
  // ===============================
  const { slug } = await params;
  const resolvedSearch = searchParams ? await searchParams : undefined;

  // ===============================
  // Tentukan Episode ID
  // ===============================
  // Jika ada ?episode= gunakan itu
  // Jika tidak, anggap slug adalah episodeId
  const episodeId = resolvedSearch?.episode ?? slug;

  // ===============================
  // Ambil Data Episode
  // ===============================
  const episodeResponse: EpisodeResponse | null = await getEpisode(episodeId);

  const episode = episodeResponse?.data ?? null;

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Anime tidak ditemukan
      </div>
    );
  }

  const streamUrl = episode.defaultStreamingUrl ?? null;
  const episodeList = episode.info?.episodeList ?? [];

  // ===============================
  // RENDER (UI LO TETAP)
  // ===============================
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* ================= INFO ================= */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{episode.title}</h1>

          {episode.info?.duration && (
            <p className="text-gray-400">Duration: {episode.info.duration}</p>
          )}

          {episode.info?.genreList && (
            <div className="flex flex-wrap gap-2">
              {episode.info.genreList.map((g) => (
                <span
                  key={g.genreId}
                  className="px-3 py-1 bg-zinc-800 rounded-md text-sm"
                >
                  {g.title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ================= STREAM ================= */}
        {streamUrl ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Streaming</h2>

            <iframe
              src={streamUrl}
              allowFullScreen
              className="w-full aspect-video rounded-lg"
            />

            <a
              href={streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"
            >
              ▶️ Buka di Tab Baru
            </a>
          </div>
        ) : (
          <div className="text-red-500">Streaming tidak tersedia</div>
        )}

        {/* ================= EPISODE LIST ================= */}
        {episodeList.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Daftar Episode</h2>

            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {episodeList.map((ep) => (
                <a
                  key={ep.episodeId}
                  href={`/anime/${slug}?episode=${ep.episodeId}`}
                  className="rounded-lg bg-zinc-900 p-4 text-center hover:bg-purple-600"
                >
                  Episode {ep.eps}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
