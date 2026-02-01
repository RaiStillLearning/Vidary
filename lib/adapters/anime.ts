// lib/adapters/anime.ts
export interface AnimeCard {
  title: string;
  slug: string;
  image: string;
}

export function mapOngoingAnime(json: any): AnimeCard[] {
  return (
    json?.data?.ongoing?.animeList?.map((item: any) => ({
      title: item.title,
      slug: item.animeId,
      image: item.poster,
    })) ?? []
  );
}
