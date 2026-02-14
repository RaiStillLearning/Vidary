import AnimeCard from "@/components/AnimeCard";

const BASE = "https://www.sankavollerei.com/anime";

async function searchAnime(keyword: string) {
  try {
    const res = await fetch(`${BASE}/search/${keyword}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error searching anime:", error);
    return null;
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const keyword = searchParams.q ?? "";

  if (!keyword) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        <p>Masukkan kata kunci pencarian</p>
      </main>
    );
  }

  const result = await searchAnime(keyword);

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <h1 className="mb-6 text-2xl">Hasil pencarian: {keyword}</h1>

      {result?.data && result.data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {result.data.map((anime: any) => (
            <AnimeCard
              key={anime.slug}
              slug={anime.slug}
              title={anime.title}
              image={anime.poster || anime.image || ""}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Tidak ada hasil ditemukan</p>
      )}
    </main>
  );
}
