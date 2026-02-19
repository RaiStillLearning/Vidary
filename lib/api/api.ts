const BASE = "https://www.sankavollerei.com/anime";

async function fetcher<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status, url);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("FETCH FAILED:", url, err);
    return null;
  }
}

// Home
export async function getHome() {
  return fetcher(`${BASE}/home`);
}

// Anime Detail ✅ FIXED
export async function getAnimeDetail(slug: string) {
  return fetcher(`${BASE}/anime/${slug}`);
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

// ============================================================
// Tambahkan fungsi-fungsi ini ke file lib/api/api.ts yang ada
// ============================================================

const SAMEHADAKU_BASE = "https://www.sankavollerei.com/anime/samehadaku";

// List semua movie (dengan pagination)
export async function getSamehadakuMovieList(page: number = 1) {
  return fetcher(`${SAMEHADAKU_BASE}/movies?page=${page}`);
}

// Detail movie by slug
export async function getSamehadakuMovieDetail(slug: string) {
  return fetcher(`${SAMEHADAKU_BASE}/anime/${slug}`);
}

// Get stream URL by server ID
export async function getSamehadakuServer(serverId: string) {
  return fetcher(`${SAMEHADAKU_BASE}/server/${serverId}`);
}
