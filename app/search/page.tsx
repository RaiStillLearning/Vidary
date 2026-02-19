import { searchAnime } from "@/lib/api/api";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";
import { Search } from "lucide-react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const keyword = q?.trim() ?? "";

  const result = keyword ? ((await searchAnime(keyword)) as any) : null;
  const animeList: any[] = result?.data ?? [];

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 60%, #0a0a0f 100%)",
      }}
    >
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800/60 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center gap-3 text-sm">
          <Link href="/" className="text-zinc-400 hover:text-white transition">
            ← Beranda
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-300">Pencarian</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        {/* Title */}
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-purple-400 shrink-0" />
          <h1 className="text-xl font-bold">
            {keyword ? (
              <>
                Hasil pencarian:{" "}
                <span className="text-purple-400">&ldquo;{keyword}&rdquo;</span>
              </>
            ) : (
              "Pencarian Anime"
            )}
          </h1>
        </div>

        {/* Empty — no keyword */}
        {!keyword && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="rounded-full bg-zinc-800/60 p-6 border border-zinc-700/40">
              <Search className="h-10 w-10 text-zinc-600" />
            </div>
            <div>
              <p className="text-zinc-300 font-medium">Cari anime favoritmu</p>
              <p className="text-zinc-500 text-sm mt-1">
                Gunakan kolom pencarian di navbar untuk memulai.
              </p>
            </div>
          </div>
        )}

        {/* No results */}
        {keyword && animeList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="text-5xl">😵</div>
            <div>
              <p className="text-zinc-300 font-medium">
                Tidak ada hasil untuk &ldquo;{keyword}&rdquo;
              </p>
              <p className="text-zinc-500 text-sm mt-1">
                Coba kata kunci lain atau periksa ejaanmu.
              </p>
            </div>
            <Link
              href="/"
              className="mt-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold transition"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        )}

        {/* Results */}
        {animeList.length > 0 && (
          <>
            <p className="text-zinc-500 text-sm">
              {animeList.length} anime ditemukan
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {animeList.map((anime: any) => (
                <AnimeCard
                  key={anime.animeId ?? anime.slug ?? anime.title}
                  slug={anime.animeId ?? anime.slug}
                  title={anime.title}
                  image={anime.poster ?? anime.image ?? ""}
                  episodes={anime.episodes}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
