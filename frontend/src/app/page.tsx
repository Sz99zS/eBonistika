import { CollectionsGrid } from "@/components/dashboard/CollectionsGrid";
import { NewCollectionButton } from "@/components/dashboard/NewCollectionButton";
import { PageMeta } from "@/components/layout/PageMeta";
import { fetchCollections } from "@/lib/api/collections";

export default async function HomePage() {
  const collections = await fetchCollections();

  return (
    <>
      <PageMeta breadcrumbs={[{ label: "Home" }]} headerAction={<NewCollectionButton />} />
      <section className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">My collections</h1>
        <p className="mt-1 text-sm text-slate-500">
          Последние открытые коллекции — по клику обновляется список.
        </p>
        <div className="mt-6">
          <CollectionsGrid collections={collections} />
        </div>
      </section>
    </>
  );
}
