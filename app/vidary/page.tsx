import HeroStackClick from "@/components/hero-stack-click";
import MovieRow from "@/components/movie-row";
import { mapOngoingAnime } from "@/lib/adapters/anime";

async function getHome() {
  const res = await fetch("https://www.sankavollerei.com/anime/home", {
    cache: "no-store",
  });
  return res.json();
}

export default async function VidaryPage() {
  const json = await getHome();

  const ongoingAnime = mapOngoingAnime(json);

  return (
    <main className="min-h-screen bg-background">
      <HeroStackClick />

      <div className="space-y-12 px-6 pb-12">
        <MovieRow title="Sedang Tayang" data={ongoingAnime} />
      </div>
    </main>
  );
}
