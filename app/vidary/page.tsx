import HeroStackClick from "@/components/hero-stack-click";
import MovieRow from "@/components/movie-row";
import { getHomeOngoingAnime } from "@/lib/services/home";
import { getCompleteAnime } from "@/lib/services/complete-anime";

// lib/services/anime.ts

export default async function VidaryPage() {
  const [ongoingAnime, completeAnime] = await Promise.all([
    getHomeOngoingAnime(),
    getCompleteAnime(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <HeroStackClick />

      <div className="space-y-12 px-6 pb-12 pt-8 md:px-12 lg:px-24">
        <h1 className="font-sans font-extrabold text-4xl">Sedang Tayang</h1>
        <MovieRow title="" data={ongoingAnime} />

        <h1 className="font-sans font-extrabold text-4xl">Selesai Tayang</h1>
        <MovieRow title="" data={completeAnime} />
      </div>
    </main>
  );
}
