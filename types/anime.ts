export interface AnimeResponse {
  data?: AnimeDetail;
}

export interface Genre {
  name?: string;
}

export interface Batch {
  slug: string;
}

export interface Episode {
  slug: string;
  episode: string;
  date?: string;
}

export interface SynopsisObject {
  paragraphs?: string[];
}

export type Synopsis = string | SynopsisObject;

export interface AnimeDetail {
  title: string;
  japanese_title?: string;
  poster?: string;
  image?: string;
  score?: string;
  status?: string;
  type?: string;
  total_episode?: string;
  duration?: string;
  release_date?: string;
  studio?: string;
  genres?: Genre[];
  synopsis?: Synopsis;
  batch?: Batch;
  episode_lists?: Episode[];
}
