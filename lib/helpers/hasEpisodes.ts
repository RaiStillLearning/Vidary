import { AnimeDetail } from "../../types/anime";

export function hasEpisodes(anime: AnimeDetail): boolean {
  return Array.isArray(anime.episode_lists) && anime.episode_lists.length > 0;
}
