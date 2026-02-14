const BASE = "https://www.sankavollerei.com/anime";

async function getAnimeDetail(slug: string) {
  try {
    // PERBAIKAN: tambahkan /anime/ di URL
    const res = await fetch(`${BASE}/anime/${slug}`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      console.error(`Failed: ${res.status} - ${BASE}/anime/${slug}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching anime detail:", error);
    return null;
  }
}

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await getAnimeDetail(slug);
  const anime = response?.data;

  if (!anime) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Anime tidak ditemukan
          </h1>
          <p className="mt-2 text-gray-400">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <img
              src={anime.poster || anime.image}
              alt={anime.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          <div className="md:col-span-2">
            <h1 className="mb-4 text-4xl font-bold">{anime.title}</h1>

            {anime.japanese_title && (
              <p className="mb-4 text-lg text-gray-400">
                {anime.japanese_title}
              </p>
            )}

            <div className="mb-6 space-y-2 text-gray-300">
              {anime.score && (
                <p className="flex items-center gap-2">
                  <span>⭐</span>
                  <span className="font-semibold text-yellow-400">
                    {anime.score}
                  </span>
                </p>
              )}
              {anime.status && (
                <p>
                  📺 Status:{" "}
                  <span className="text-green-400">{anime.status}</span>
                </p>
              )}
              {anime.type && <p>🎬 Type: {anime.type}</p>}
              {anime.total_episode && (
                <p>📺 Total Episode: {anime.total_episode}</p>
              )}
              {anime.duration && <p>⏱️ Duration: {anime.duration}</p>}
              {anime.release_date && <p>📅 Release: {anime.release_date}</p>}
              {anime.studio && <p>🏢 Studio: {anime.studio}</p>}
            </div>

            {anime.genres?.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-3 text-xl font-semibold">Genre</h2>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre: any, i: number) => (
                    <span
                      key={i}
                      className="rounded-full bg-purple-600 px-4 py-1.5 text-sm font-medium"
                    >
                      {genre.name || genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {anime.synopsis && (
              <div className="mb-6">
                <h2 className="mb-3 text-xl font-semibold">Sinopsis</h2>
                <div className="space-y-3 leading-relaxed text-gray-300">
                  {Array.isArray(anime.synopsis.paragraphs) ? (
                    anime.synopsis.paragraphs.map(
                      (paragraph: string, i: number) => (
                        <p key={i}>{paragraph}</p>
                      ),
                    )
                  ) : (
                    <p>{String(anime.synopsis)}</p>
                  )}
                </div>
              </div>
            )}

            {anime.batch && (
              <div className="mb-6">
                <a
                  href={`/batch/${anime.batch.slug}`}
                  className="inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
                >
                  📥 Download Batch
                </a>
              </div>
            )}
          </div>
        </div>

        {anime.episode_lists?.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Daftar Episode</h2>

            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {anime.episode_lists.map((ep: any) => (
                <a
                  key={ep.slug}
                  href={`/watch/${ep.slug}`}
                  className="rounded-lg bg-zinc-900 p-4 text-center transition hover:bg-purple-600 hover:shadow-lg"
                >
                  <p className="font-semibold">Episode {ep.episode}</p>
                  {ep.date && (
                    <p className="mt-1 text-xs text-gray-400">{ep.date}</p>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
