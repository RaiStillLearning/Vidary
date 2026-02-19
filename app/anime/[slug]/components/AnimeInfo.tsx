import type { AnimeDetail } from "@/types/anime";

interface Props {
  anime: AnimeDetail;
}

export default function AnimeInfo({ anime }: Props) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div>
        <img
          src={anime.poster ?? anime.image ?? ""}
          alt={anime.title}
          className="w-full rounded-lg"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold">{anime.title}</h1>
      </div>
    </div>
  );
}
