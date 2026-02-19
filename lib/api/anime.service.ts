import { fetcher } from "./client";
import type { AnimeResponse } from "@/types/anime";

const BASE = "https://www.sankavollerei.com/anime";

export async function getAnimeDetail(slug: string) {
  const url = `${BASE}/${slug}`;
  console.log("DETAIL URL:", url);
  return fetcher<AnimeResponse>(url);
}
