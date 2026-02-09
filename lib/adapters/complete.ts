// lib/adapters/anime.ts

export interface AnimeCard {
  title: string;
  slug: string;
  image: string;
}

interface completeAnimeItem {
  title?: string;
  animeId?: string;
  slug?: string;
  poster?: string;
}

export function completeAnime(json: unknown): AnimeCard[] {
  const list = (json as any)?.data?.animeList as
    | completeAnimeItem[]
    | undefined;

  if (!Array.isArray(list)) return [];

  return list.map((item) => ({
    title: item.title ?? "Untitled",
    slug: item.animeId ?? item.slug ?? "",
    image: item.poster ?? "/placeholder.jpg",
  }));
}
