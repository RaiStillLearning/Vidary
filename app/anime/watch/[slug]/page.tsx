const BASE = "https://www.sankavollerei.com/anime";

async function getEpisode(slug: string) {
  try {
    const res = await fetch(`${BASE}/episode/${slug}`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Episode fetch error:", error);
    return null;
  }
}

async function getStreamUrl(servers: any[]) {
  if (!Array.isArray(servers)) return null;

  for (const server of servers) {
    try {
      const res = await fetch(`${BASE}/server/${server.id}`, {
        cache: "no-store",
      });

      if (!res.ok) continue;

      const json = await res.json();

      if (json?.data?.url) {
        return json.data.url;
      }
    } catch {
      continue;
    }
  }

  return null;
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const episode = await getEpisode(slug);

  if (!episode?.data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        Episode tidak ditemukan
      </div>
    );
  }

  const servers = episode.data.servers ?? [];
  const streamUrl = await getStreamUrl(servers);

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-2xl font-bold">{episode.data.title}</h1>

        {streamUrl ? (
          <iframe
            src={streamUrl}
            className="aspect-video w-full rounded-lg"
            allowFullScreen
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-zinc-900 text-red-500">
            Stream tidak tersedia
          </div>
        )}

        {/* Episode Info */}
        <div className="mt-6">
          {episode.data.anime_title && (
            <p className="mb-2 text-gray-400">
              Anime: {episode.data.anime_title}
            </p>
          )}

          <div className="mt-4 flex gap-4">
            {episode.data.previous_episode && (
              <a
                href={`/watch/${episode.data.previous_episode.slug}`}
                className="rounded-lg bg-zinc-800 px-4 py-2 transition hover:bg-purple-600"
              >
                ← Previous
              </a>
            )}

            {episode.data.next_episode && (
              <a
                href={`/watch/${episode.data.next_episode.slug}`}
                className="rounded-lg bg-zinc-800 px-4 py-2 transition hover:bg-purple-600"
              >
                Next →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
