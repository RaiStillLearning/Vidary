interface Batch {
  slug: string;
}

export default function BatchSection({ batch }: { batch?: Batch }) {
  return (
    <div className="mt-12 text-center space-y-4">
      <h2 className="text-2xl font-bold text-yellow-400">
        Streaming Tidak Tersedia
      </h2>

      <p className="text-gray-400">
        Anime ini hanya tersedia dalam format batch download.
      </p>

      {batch && (
        <a
          href={`/batch/${batch.slug}`}
          className="inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
        >
          📥 Download Batch
        </a>
      )}
    </div>
  );
}
