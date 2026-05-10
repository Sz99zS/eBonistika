import { apiFetch } from "@/lib/api-client";
import type { Collection } from "@/types/collection";

async function getCollections(): Promise<
  { ok: true; data: Collection[] } | { ok: false; error: string }
> {
  try {
    const data = await apiFetch<Collection[]>("/collections", {
      cache: "no-store",
    });
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function HomePage() {
  const result = await getCollections();

  return (
    <section className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Collections</h1>

      {result.ok ? (
        result.data.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No collections yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-zinc-200 rounded-md border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {result.data.map((collection) => (
              <li key={collection.id} className="px-4 py-3 text-sm">
                {collection.name}
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Failed to load collections: {result.error}
        </div>
      )}
    </section>
  );
}
