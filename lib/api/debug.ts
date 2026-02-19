export async function debugHome() {
  const res = await fetch("https://www.sankavollerei.com/anime/home", {
    cache: "no-store",
    headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" },
  });
  const data = await res.json();
  console.log("HOME DATA:", JSON.stringify(data, null, 2));
  return data;
}
