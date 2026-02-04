export interface AnimeCard {
  title: string;
  slug: string;
  image: string;
}

interface SamehadakuMovieItem {
  title?: string;
  animeId?: string;
  poster?: string;
}

export function mapSamehadakuMovies(json: unknown): AnimeCard[] {
  const list = (json as any)?.data?.animeList as
    | SamehadakuMovieItem[]
    | undefined;

  if (!Array.isArray(list)) return [];

  return list.map((item) => ({
    title: item.title ?? "Untitled",
    slug: item.animeId ?? "",
    image: item.poster ?? "/placeholder.jpg",
  }));
}
