async function getAnime(slug: string) {
  const res = await fetch(
    `https://www.sankavollerei.com/anime/episode/${slug}`,
    { cache: "no-store" },
  );
  return res.json();
}

export default async function AnimePlayer({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getAnime(params.slug);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>

      <iframe
        src={data.server[0].url}
        className="aspect-video w-full rounded-lg"
        allowFullScreen
      />
    </div>
  );
}
