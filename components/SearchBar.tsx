"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AnimeResult {
  animeId: string;
  title: string;
  poster?: string;
  image?: string;
}

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 400);

  // Fetch results when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(
      `https://www.sankavollerei.com/anime/search/${encodeURIComponent(debouncedQuery)}`,
      {
        headers: { Accept: "application/json" },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          const raw = data?.data?.animeList ?? data?.data;
          setResults(Array.isArray(raw) ? raw : []);
          setOpen(true);
        }
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClear() {
    setQuery("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleSelect(animeId: string) {
    router.push(`/anime/${animeId}`);
    setOpen(false);
    setQuery("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xs">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Cari anime..."
          className="pl-9 pr-8 h-9 text-sm bg-zinc-900 border-zinc-700 focus:border-purple-500 text-white placeholder:text-zinc-500 transition-colors"
        />
        {/* Clear / Loading indicator */}
        {query && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 text-zinc-400 animate-spin" />
            ) : (
              <button
                onClick={handleClear}
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Hapus pencarian"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 w-72 rounded-xl border border-zinc-700/60 bg-zinc-900/95 backdrop-blur-md shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {results.length === 0 && !loading ? (
            <div className="px-4 py-6 text-center text-sm text-zinc-500">
              Tidak ada hasil ditemukan
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto divide-y divide-zinc-800/60">
              {results.slice(0, 8).map((anime) => (
                <li key={anime.animeId}>
                  <button
                    onClick={() => handleSelect(anime.animeId)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-zinc-800/80 transition-colors text-left group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-9 h-12 rounded-md overflow-hidden bg-zinc-800 shrink-0">
                      {anime.poster || anime.image ? (
                        <Image
                          src={anime.poster ?? anime.image ?? ""}
                          alt={anime.title}
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-zinc-700">
                          <Search className="h-3 w-3" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <span className="text-sm text-zinc-200 group-hover:text-white line-clamp-2 transition-colors">
                      {anime.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Footer hint */}
          {results.length > 0 && (
            <div className="px-3 py-2 border-t border-zinc-800/60 flex items-center justify-between">
              <span className="text-[11px] text-zinc-600">
                {results.length} hasil
              </span>
              <button
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                  setOpen(false);
                }}
                className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
              >
                Lihat semua →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
