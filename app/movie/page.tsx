import { MovieGrid } from "@/components/movie-grid";
import { getSamehadakuMovies } from "@/lib/services/movies";

export default async function MoviesPage() {
  const movies = await getSamehadakuMovies();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <MovieGrid data={movies} />
    </div>
  );
}
