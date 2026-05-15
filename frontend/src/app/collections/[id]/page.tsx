import { notFound } from "next/navigation";

import { SeriesList } from "@/components/collection/SeriesList";
import { PageMeta } from "@/components/layout/PageMeta";
import { fetchCollections } from "@/lib/api/collections";
import { getMockSeriesByCollection } from "@/lib/mock-data";

export default async function CollectionPage({ params }: PageProps<"/collections/[id]">) {
  const { id } = await params;

  const collections = await fetchCollections();
  const collection = collections.find((c) => c.id === id);
  if (!collection) notFound();

  const series = getMockSeriesByCollection(id);

  return (
    <>
      <PageMeta
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: collection.name },
        ]}
      />
      <section className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{collection.name}</h1>
        <p className="mt-1 text-sm text-slate-500">Серии в этой коллекции</p>
        <div className="mt-6">
          <SeriesList collectionId={collection.id} series={series} />
        </div>
      </section>
    </>
  );
}
