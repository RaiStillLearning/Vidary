// lib/adapters/anime.ts

export interface AnimeCard {
  title: string;
  slug: string;
  image: string;
}

interface OngoingAnimeItem {
  title?: string;
  animeId?: string;
  poster?: string;
} 

export function mapHomeOngoingAnime(json: unknown): AnimeCard[] {
  const list = (json as any)?.data?.ongoing?.animeList as
    | OngoingAnimeItem[]
    | undefined;

  if (!Array.isArray(list)) return [];

  return list.map((item) => ({
    title: item.title ?? "Untitled",
    slug: item.animeId ?? "",
    image: item.poster ?? "/placeholder.jpg",
  }));
}
