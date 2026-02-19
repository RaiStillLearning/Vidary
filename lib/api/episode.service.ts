import { fetcher } from "./client";
import type { EpisodeResponse } from "@/types/episode";

const BASE = "https://www.sankavollerei.com/anime";

export async function getEpisode(slug: string) {
  return fetcher<EpisodeResponse>(`${BASE}/episode/${slug}`);
}

export async function getServer(serverId: string) {
  return fetcher<{ data?: { url?: string } }>(`${BASE}/server/${serverId}`);
}
