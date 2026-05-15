import { notFound } from "next/navigation";

import { InstanceView } from "@/components/instance/InstanceView";
import { PageMeta } from "@/components/layout/PageMeta";
import { fetchCollections } from "@/lib/api/collections";
import {
  getMockItemsBySeries,
  getMockSeriesById,
} from "@/lib/mock-data";

export default async function InstancePage({
  params,
}: PageProps<"/collections/[id]/series/[seriesId]/items/[itemId]">) {
  const { id, seriesId, itemId } = await params;

  const collections = await fetchCollections();
  const collection = collections.find((c) => c.id === id);
  const series = getMockSeriesById(seriesId);
  if (!collection || !series || series.collectionId !== id) notFound();

  const items = getMockItemsBySeries(seriesId);
  const index = items.findIndex((i) => i.id === itemId);
  if (index < 0) notFound();
  const item = items[index];

  const base = `/collections/${collection.id}/series/${series.id}/items`;
  const prevHref = index > 0 ? `${base}/${items[index - 1].id}` : null;
  const nextHref = index < items.length - 1 ? `${base}/${items[index + 1].id}` : null;
  const closeHref = `/collections/${collection.id}/series/${series.id}`;

  return (
    <>
      <PageMeta
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: collection.name, href: `/collections/${collection.id}` },
          { label: series.name, href: closeHref },
          { label: `${item.nominal} ${item.currency}, ${item.year}` },
        ]}
      />
      <section className="mx-auto max-w-6xl">
        <InstanceView
          item={item}
          prevHref={prevHref}
          nextHref={nextHref}
          closeHref={closeHref}
        />
      </section>
    </>
  );
}
