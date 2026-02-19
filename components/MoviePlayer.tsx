"use client";

import { useState, useEffect } from "react";
import { Loader2, ServerCrash } from "lucide-react";

interface Server {
  quality: string;
  title: string;
  serverId: string;
}

interface MoviePlayerProps {
  servers: Server[];
  defaultUrl: string | null;
}

const BASE = "https://www.sankavollerei.com/anime/samehadaku";

export function MoviePlayer({ servers, defaultUrl }: MoviePlayerProps) {
  // Group by quality
  const qualities = Array.from(new Set(servers.map((s) => s.quality)));

  const [streamUrl, setStreamUrl] = useState<string | null>(defaultUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  function fetchServer(serverId: string) {
    setActiveId(serverId);
    setLoading(true);
    setError(false);
    setStreamUrl(null);

    fetch(`${BASE}/server/${serverId}`)
      .then((res) => res.json())
      .then((data) => {
        const url = data?.data?.url;
        if (url) setStreamUrl(url);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  const noServers = servers.length === 0 && !defaultUrl;

  if (noServers) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 py-20">
        <ServerCrash className="h-8 w-8 text-zinc-600" />
        <p className="text-sm text-zinc-500">Server tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quality + Server buttons */}
      {servers.length > 0 && (
        <div className="space-y-2">
          {qualities.map((q) => (
            <div key={q} className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-zinc-500 w-12 shrink-0 uppercase font-semibold">
                {q}
              </span>
              {servers
                .filter((s) => s.quality === q)
                .map((s) => (
                  <button
                    key={s.serverId}
                    onClick={() => fetchServer(s.serverId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      activeId === s.serverId
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-purple-500 hover:text-white"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Player */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            <p className="text-sm text-zinc-500">Memuat video...</p>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <ServerCrash className="h-8 w-8 text-zinc-600" />
            <p className="text-sm text-zinc-400">
              Gagal memuat video, coba server lain
            </p>
          </div>
        )}

        {streamUrl && !loading && (
          <iframe
            src={streamUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </div>
  );
}
