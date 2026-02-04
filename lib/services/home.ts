// lib/services/home.ts
import { mapHomeOngoingAnime } from "@/lib/adapters/anime";

export async function getHomeOngoingAnime() {
  const res = await fetch("https://www.sankavollerei.com/anime/home", {
    cache: "no-store",
  });

  const json = await res.json();
  return mapHomeOngoingAnime(json);
}
