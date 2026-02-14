const BASE = "https://www.sankavollerei.com/anime";

async function fetcher(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

// Home
export async function getHome() {
  return fetcher(`${BASE}/home`);
}

// Anime Detail
export async function getAnimeDetail(slug: string) {
  return fetcher(`${BASE}/${slug}`);
}

// Episode Detail & Servers
export async function getEpisode(slug: string) {
  return fetcher(`${BASE}/episode/${slug}`);
}

// Server Stream URL
export async function getServer(id: string) {
  return fetcher(`${BASE}/server/${id}`);
}

// Search
export async function searchAnime(keyword: string) {
  return fetcher(`${BASE}/search/${keyword}`);
}

// Ongoing Anime
export async function getOngoingAnime(page: number = 1) {
  return fetcher(`${BASE}/ongoing-anime?page=${page}`);
}

// Complete Anime
export async function getCompleteAnime(page: number = 1) {
  return fetcher(`${BASE}/complete-anime?page=${page}`);
}

// Genre List
export async function getGenreList() {
  return fetcher(`${BASE}/genre`);
}

// Anime by Genre
export async function getAnimeByGenre(genre: string, page: number = 1) {
  return fetcher(`${BASE}/genre/${genre}?page=${page}`);
}

// Schedule
export async function getSchedule() {
  return fetcher(`${BASE}/schedule`);
}

// Batch Detail
export async function getBatch(slug: string) {
  return fetcher(`${BASE}/batch/${slug}`);
}

// All Anime
export async function getAllAnime() {
  return fetcher(`${BASE}/unlimited`);
}
