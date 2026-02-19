export async function fetcher<T>(url: string): Promise<T | null> {
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
