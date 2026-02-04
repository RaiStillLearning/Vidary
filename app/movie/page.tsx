import { MovieGrid } from "@/components/movie-grid"

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Movie List
      </h1>
      <MovieGrid count={18} />
    </div>
  )
}
