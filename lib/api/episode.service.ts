// lib/api/episode.service.ts
import { fetcher } from "./client";
import type { EpisodeResponse } from "@/types/episode";

export async function getEpisode(
  episodeId: string,
): Promise<EpisodeResponse | null> {
  const data = await fetcher<EpisodeResponse>(
    `https://www.sankavollerei.com/anime/episode/${episodeId}`,
  );
  return data;
}

export async function getServer(serverId: string) {
  return fetcher(`https://www.sankavollerei.com/anime/server/${serverId}`);
}
