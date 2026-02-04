import HeroStackClick from "@/components/hero-stack-click";
import MovieRow from "@/components/movie-row";
import { getHomeOngoingAnime } from "@/lib/services/home";

// lib/services/anime.ts

export default async function VidaryPage() {
  const ongoingAnime = await getHomeOngoingAnime();
  return (
    <main className="min-h-screen bg-background">
      <HeroStackClick />

      <div className="space-y-12 px-6 pb-12">
        <MovieRow title="Sedang Tayang" data={ongoingAnime} />
      </div>
    </main>
  );
}
