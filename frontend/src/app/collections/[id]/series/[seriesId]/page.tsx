import { notFound } from "next/navigation";

import { PageMeta } from "@/components/layout/PageMeta";
import { ItemsGrid } from "@/components/series/ItemsGrid";
import { fetchCollections } from "@/lib/api/collections";
import { fetchItemsBySeries } from "@/lib/api/items";
import { fetchSeriesById } from "@/lib/api/series";

export default async function SeriesPage({
  params,
}: PageProps<"/collections/[id]/series/[seriesId]">) {
  const { id, seriesId } = await params;

  const [collections, series, items] = await Promise.all([
    fetchCollections(),
    fetchSeriesById(seriesId),
    fetchItemsBySeries(seriesId),
  ]);

  const collection = collections.find((c) => c.id === id);
  if (!collection || !series || series.collectionId !== id) notFound();

  return (
    <>
      <PageMeta
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: collection.name, href: `/collections/${collection.id}` },
          { label: series.name },
        ]}
      />
      <section className="mx-auto max-w-6xl">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{series.name}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {series.yearFrom}–{series.yearTo} · всего предметов: {items.length}
          </p>
        </div>

        <ItemsGrid
          collectionId={collection.id}
          seriesId={series.id}
          items={items}
          seriesYearFrom={series.yearFrom}
          seriesYearTo={series.yearTo}
        />
      </section>
    </>
  );
}
