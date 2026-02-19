import { getEpisode, getServer } from "@/lib/api/episode.service";
import type { EpisodeData } from "@/types/episode";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await getEpisode(slug);
  const episode: EpisodeData | null = response?.data ?? null;

  if (!episode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-red-500">
        Episode tidak ditemukan
      </div>
    );
  }

  let streamUrl: string | null = null;

  // ✅ 1️⃣ Gunakan defaultStreamingUrl kalau ada
  if (episode.defaultStreamingUrl) {
    streamUrl = episode.defaultStreamingUrl;
  }

  // ✅ 2️⃣ Kalau tidak ada, ambil server pertama
  if (!streamUrl && episode.server?.qualities?.length) {
    const firstQuality = episode.server.qualities[0];
    const firstServer = firstQuality.serverList[0];

    if (firstServer?.serverId) {
      const serverResponse = await getServer(firstServer.serverId);
      streamUrl = serverResponse?.data?.url ?? null;
    }
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-2xl font-bold">{episode.title}</h1>

        {streamUrl ? (
          <iframe
            src={streamUrl}
            allowFullScreen
            className="aspect-video w-full rounded-lg"
          />
        ) : (
          <div className="text-red-500">Stream tidak tersedia</div>
        )}
      </div>
    </div>
  );
}
