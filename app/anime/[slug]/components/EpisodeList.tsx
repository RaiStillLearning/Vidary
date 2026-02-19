interface Episode {
  slug: string;
  episode: string;
  date?: string;
}

export default function EpisodeList({ episodes }: { episodes: Episode[] }) {
  console.log("EP:", episodes);
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Daftar Episode</h2>

      <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {episodes.map((ep) => (
          <a
            key={ep.slug}
            href={`/watch/${ep.slug}`}
            className="rounded-lg bg-zinc-900 p-4 text-center transition hover:bg-purple-600"
          >
            <p className="font-semibold">Episode {ep.episode}</p>
            {ep.date && <p className="mt-1 text-xs text-gray-400">{ep.date}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}
