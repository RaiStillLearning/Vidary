import { mapSamehadakuMovies } from "@/lib/adapters/movies";

export async function getSamehadakuMovies() {
  const res = await fetch(
    "https://www.sankavollerei.com/anime/samehadaku/movies",
    { cache: "no-store" },
  );

  const json = await res.json();
  return mapSamehadakuMovies(json);
}
