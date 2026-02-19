"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Episode {
  episodeId: string;
  eps: number | string;
}

interface EpisodeListProps {
  episodes: Episode[];
  slug: string;
}

const PER_PAGE = 50;

export function EpisodeList({ episodes, slug }: EpisodeListProps) {
  const [page, setPage] = useState(0);

  // Sort ascending by episode number first
  const sorted = useMemo(() => {
    return [...episodes].sort((a, b) => {
      const numA = parseFloat(String(a.eps)) || 0;
      const numB = parseFloat(String(b.eps)) || 0;
      return numA - numB;
    });
  }, [episodes]);

  const totalPages = Math.ceil(sorted.length / PER_PAGE);

  const currentEpisodes = useMemo(
    () => sorted.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE),
    [sorted, page],
  );

  // Range label based on actual episode numbers
  const firstEp = currentEpisodes[0]?.eps ?? page * PER_PAGE + 1;
  const lastEp =
    currentEpisodes[currentEpisodes.length - 1]?.eps ??
    Math.min(page * PER_PAGE + PER_PAGE, sorted.length);

  function goToPage(p: number) {
    setPage(p);
    // scroll to episode section smoothly
    document
      .getElementById("episode-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div id="episode-list" className="space-y-4 scroll-mt-20">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Daftar Episode</h2>
          <span className="text-sm text-zinc-500">
            ({sorted.length} episode)
          </span>
        </div>

        {/* Quick jump range buttons */}
        {totalPages > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageEps = sorted.slice(i * PER_PAGE, (i + 1) * PER_PAGE);
              const label = `${pageEps[0]?.eps}–${pageEps[pageEps.length - 1]?.eps}`;
              return (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition ${
                    page === i
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-purple-500 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Episode grid */}
      <div className="grid gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {currentEpisodes.map((ep) => (
          <a
            key={ep.episodeId}
            href={`/anime/${slug}/episode/${ep.episodeId}`}
            className="rounded-lg py-2.5 text-center text-xs font-medium transition border bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-purple-600 hover:border-purple-500 hover:text-white"
          >
            {ep.eps}
          </a>
        ))}
      </div>

      {/* Prev / Next */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => goToPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-zinc-700 text-zinc-400 hover:border-purple-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          <span className="text-xs text-zinc-500">
            Eps {firstEp}–{lastEp} dari {sorted.length}
          </span>

          <button
            onClick={() => goToPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-zinc-700 text-zinc-400 hover:border-purple-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Selanjutnya
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
