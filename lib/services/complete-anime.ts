import { completeAnime } from "../adapters/complete";

export async function getCompleteAnime() {
  const rest = await fetch(
    "https://www.sankavollerei.com/anime/complete-anime?page=1",
    { cache: "no-store" },
  );
  const json = await rest.json();
  return completeAnime(json);
}
